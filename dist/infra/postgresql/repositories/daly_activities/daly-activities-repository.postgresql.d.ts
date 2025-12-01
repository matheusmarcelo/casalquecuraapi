import { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
import { CustomerChartReportDto } from 'src/dtos/chart_report/chart_report.dto';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { Repository } from 'typeorm';
export declare class DalyActivitiesRepositoryPostgresql implements IDalyActivitiesRepository {
    private readonly dalyActivityRepository;
    constructor(dalyActivityRepository: Repository<DalyActivities>);
    createDalyActivityAsync(entity: DalyActivities): Promise<void>;
    getDalyActivitiesAsync(customerOrLinkedUserId: string): Promise<DalyActivities[]>;
    getTotalActivitiesWeekAsync(customerOrLinkedUserId: string): Promise<number>;
    getCustomerTotalActivitiesDoneAsync(customerOrLinkedUserId: string): Promise<number>;
    getCustomerTotalPointsAsync(customerOrLinkedUserId: string): Promise<number>;
    getChartData(customerOrLinkedUserId: string, days: 7 | 15 | 30): Promise<CustomerChartReportDto>;
    private groupData;
    private groupByDays;
    private groupByWeek;
    private fillMissingDays;
}
