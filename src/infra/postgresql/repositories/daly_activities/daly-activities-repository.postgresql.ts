import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
import { ChartReportInterval } from 'src/constants/enums/chartReport/chartReport.enum';
import { ChartDataPointDto, CustomerChartReportDto } from 'src/dtos/chart_report/chart_report.dto';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { Repository } from 'typeorm';

@Global()
@Injectable()
export class DalyActivitiesRepositoryPostgresql implements IDalyActivitiesRepository {

    constructor(
        @InjectRepository(DalyActivities)
        private readonly dalyActivityRepository: Repository<DalyActivities>
    ) { }

    async createDalyActivityAsync(entity: DalyActivities): Promise<void> {
        await this.dalyActivityRepository.save(entity);
    }

    async getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]> {
        return this.dalyActivityRepository.find({
            where: {
                user: { id: customerId },
                completionDate: new Date()
            }
        })
    }

    async getTotalActivitiesWeekAsync(customerId: string): Promise<number> {
        const totalActivity = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .where('activity.user_id = :userId', { userId: customerId })
            .andWhere(
                `activity.completion_date BETWEEN 
            date_trunc('week', CURRENT_DATE) AND CURRENT_TIMESTAMP`
            )
            .getCount();

        return totalActivity || 0;
    }

    async getCustomerTotalActivitiesDoneAsync(customerId: string): Promise<number> {
        const totalActivity = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .where('activity.user_id = :userId', { userId: customerId })
            .getCount();

        return totalActivity || 0;
    }

    async getCustomerTotalPointsAsync(customerId: string): Promise<number> {
        const result = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .select('COALESCE(SUM(activity.score), 0)', 'totalPoints')
            .where('activity.user_id = :userId', { userId: customerId })
            .getRawOne();

        return parseInt(result?.totalPoints) || 0;
    }

    async getChartData(customerId: string, days: 7 | 15 | 30): Promise<CustomerChartReportDto> {
        const dataPoints = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .select('DATE(activity.completion_date)', 'date')
            .addSelect('COALESCE(SUM(activity.score), 0)', 'points')
            .where('activity.user_id = :userId', { userId: customerId })
            .andWhere(`activity.completion_date >= CURRENT_DATE - INTERVAL '${days} days'`)
            .groupBy('DATE(activity.completion_date)')
            .orderBy('date', 'ASC')
            .getRawMany();



        const groupedData = this.groupData(dataPoints, days);
        const allMaxPoints = groupedData.map(d => d.maxPoints);

        console.log('\n\n\n\n\n', groupedData);

        return {
            minPoints: allMaxPoints.length > 0 ? Math.min(...allMaxPoints) : 0,
            maxPoints: allMaxPoints.length > 0 ? Math.max(...allMaxPoints) : 0,
            interval: days,
            data: groupedData
        };
    }

    private groupData(dataPoints: any[], days: ChartReportInterval): ChartDataPointDto[] {
        if (days === ChartReportInterval.WEEKLY) {
            return this.fillMissingDays(dataPoints, ChartReportInterval.WEEKLY).map(d => ({
                label: new Date(d.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
                points: parseInt(d.points) || 0,
                maxPoints: parseInt(d.points) || 0,
                date: d.date
            }));
        } else if (days === ChartReportInterval.BIWEEKLY) {
            return this.groupByDays(dataPoints, 2, ChartReportInterval.BIWEEKLY);
        } else {
            return this.groupByWeek(dataPoints, ChartReportInterval.MONTHLY);
        }
    }

    private groupByDays(dataPoints: any[], groupSize: number, totalDays: number): ChartDataPointDto[] {
        const result: ChartDataPointDto[] = [];
        const today = new Date();
        const numberOfGroups = 5;
        const daysPerGroup = 3;

        for (let groupIndex = 0; groupIndex < numberOfGroups; groupIndex++) {
            let totalPoints = 0;
            let maxPointsInPeriod = 0;


            const groupStartOffset = (numberOfGroups * daysPerGroup) - 1 - (groupIndex * daysPerGroup);
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - groupStartOffset);


            for (let j = 0; j < daysPerGroup; j++) {
                const dayOffset = groupStartOffset - j;
                if (dayOffset < 0) break;

                const date = new Date(today);
                date.setDate(today.getDate() - dayOffset);
                const dateStr = date.toISOString().split('T')[0];

                const existing = dataPoints.find(d => d.date === dateStr);
                if (existing) {
                    const dayPoints = parseInt(existing.points);
                    totalPoints += dayPoints;
                    maxPointsInPeriod = Math.max(maxPointsInPeriod, dayPoints);
                }
            }

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + daysPerGroup - 1);

            result.push({
                label: `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}`,
                points: totalPoints,
                maxPoints: maxPointsInPeriod,
                date: startDate.toISOString().split('T')[0]
            });
        }

        return result.reverse();
    }

    private groupByWeek(dataPoints: any[], totalDays: number): ChartDataPointDto[] {
        const result: ChartDataPointDto[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const numberOfWeeks = 5;
        const daysPerWeek = 7;

        for (let weekIndex = 0; weekIndex < numberOfWeeks; weekIndex++) {
            let totalPoints = 0;
            let maxPointsInWeek = 0;


            const weekStartOffset = totalDays - 1 - (weekIndex * daysPerWeek);
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - weekStartOffset);

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            if (endDate > today) {
                endDate.setTime(today.getTime());
            }


            for (let dayInWeek = 0; dayInWeek < daysPerWeek; dayInWeek++) {
                const dayOffset = weekStartOffset - dayInWeek;
                if (dayOffset < 0) break;

                const date = new Date(today);
                date.setDate(today.getDate() - dayOffset);
                const dateStr = date.toISOString().split('T')[0];

                const existing = dataPoints.find(d => {
                    const existingDateStr = d.date.toISOString ? d.date.toISOString().split('T')[0] : d.date;
                    return existingDateStr === dateStr;
                });

                if (existing) {
                    const dayPoints = parseInt(existing.points);
                    totalPoints += dayPoints;
                    maxPointsInWeek = Math.max(maxPointsInWeek, dayPoints);
                }
            }

            const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

            const label = `${startDate.getDate()}${monthNames[startDate.getMonth()]}\n${endDate.getDate()}${monthNames[endDate.getMonth()]}`;

            result.push({
                label,
                points: totalPoints,
                maxPoints: maxPointsInWeek,
                date: startDate.toISOString().split('T')[0]
            });
        }

        return result.reverse();
    }

    private fillMissingDays(dataPoints: any[], days: number): any[] {
        const result: { date: string, points: number }[] = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const existing = dataPoints.find(d => d.date === dateStr);
            result.push({
                date: dateStr,
                points: existing ? existing.points : 0
            });
        }

        return result;
    }
}
