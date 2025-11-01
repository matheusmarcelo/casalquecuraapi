import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
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
}
