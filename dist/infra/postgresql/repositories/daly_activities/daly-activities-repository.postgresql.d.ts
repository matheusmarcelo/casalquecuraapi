import { IDalyActivitiesRepository } from 'src/constants/contracts/daly-activities/IDalyActivitiesRepository.contract';
import { DalyActivities } from 'src/entitites/daly-activities/daly_activities.entity';
import { Repository } from 'typeorm';
export declare class DalyActivitiesRepositoryPostgresql implements IDalyActivitiesRepository {
    private readonly dalyActivityRepository;
    constructor(dalyActivityRepository: Repository<DalyActivities>);
    createDalyActivityAsync(entity: DalyActivities): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
}
