import { DalyActivities } from "src/entitites/daly-activities/daly_activities.entity";
export interface IDalyActivitiesRepository {
    createDalyActivityAsync(entity: DalyActivities): Promise<void>;
    getDalyActivitiesAsync(customerId: string): Promise<DalyActivities[]>;
}
