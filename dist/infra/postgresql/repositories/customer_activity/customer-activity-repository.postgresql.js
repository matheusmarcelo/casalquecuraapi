"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerActivityRepositoryPostgresql = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_entity_1 = require("../../../../entitites/activity/activity.entity");
const customer_activity_entity_1 = require("../../../../entitites/customer-activity/customer-activity.entity");
const daly_activities_entity_1 = require("../../../../entitites/daly-activities/daly_activities.entity");
const typeorm_2 = require("typeorm");
let CustomerActivityRepositoryPostgresql = class CustomerActivityRepositoryPostgresql {
    customerActivityRepository;
    activitiesRepository;
    dalyActivitiesRepository;
    constructor(customerActivityRepository, activitiesRepository, dalyActivitiesRepository) {
        this.customerActivityRepository = customerActivityRepository;
        this.activitiesRepository = activitiesRepository;
        this.dalyActivitiesRepository = dalyActivitiesRepository;
    }
    async createCustomerActivityAsync(customer_activity) {
        await this.customerActivityRepository.save(customer_activity);
    }
    async getCustomerActivityAsync(id) {
        const customerActivity = await this.customerActivityRepository.findOne({ where: { id } });
        return customerActivity;
    }
    async getCustomerActivitiesAsync(customerId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const response = [];
        const activities = await this.activitiesRepository.find({
            where: { isGeneral: true },
        });
        const customerActivities = await this.customerActivityRepository.find({
            where: { customer: { id: customerId } },
            relations: ['activity'],
        });
        const dalyActivities = await this.dalyActivitiesRepository
            .createQueryBuilder('da')
            .innerJoinAndSelect('da.activity', 'activity')
            .where('CAST(da.completion_date AS date) = :today', { today })
            .andWhere('da.user_id = :customerId', { customerId })
            .getMany();
        const completedActivityIds = new Set(dalyActivities.map((d) => d.activity.id));
        const availableGeneralActivities = activities.filter((a) => !completedActivityIds.has(a.id));
        const availableUserActivities = customerActivities.filter((ua) => !completedActivityIds.has(ua.activity.id));
        const userActivities = availableUserActivities.map(x => x.activity);
        userActivities.forEach(activity => {
            const alreadyExists = availableGeneralActivities.some(a => a.id === activity.id);
            if (!alreadyExists) {
                availableGeneralActivities.push(activity);
            }
        });
        response.push(...availableGeneralActivities);
        return response;
    }
    async getCustomerActivitiesByActivityIdAsync(activityId) {
        const customerActivities = await this.customerActivityRepository.find({
            where: {
                activity: { id: activityId },
            },
            select: ['id']
        });
        return customerActivities;
    }
    async deleteCustomerActivityAsync(id) {
        await this.customerActivityRepository.delete(id);
    }
    async getCustomerActivityByCustomerIdAndActivityIdAsync(customerId, activityId) {
        const customerActivity = await this.customerActivityRepository.findOneBy({
            customer: { id: customerId },
            activity: { id: activityId }
        });
        return customerActivity;
    }
    async assignCustomersToActivityAsync(activityId, customerIds) {
        const existingRecords = await this.customerActivityRepository
            .createQueryBuilder('ca')
            .innerJoinAndSelect('ca.customer', 'customer')
            .where('ca.activity_id = :activityId', { activityId })
            .andWhere('ca.user_id IN (:...customerIds)', { customerIds })
            .getMany();
        console.log(existingRecords);
        const existingCustomerIds = new Set(existingRecords.map(record => record.customer.id));
        const newCustomerIds = customerIds.filter(id => !existingCustomerIds.has(id));
        if (newCustomerIds.length > 0) {
            const values = newCustomerIds.map(customerId => ({
                customer: customerId,
                activity: activityId,
            }));
            await this.customerActivityRepository
                .createQueryBuilder()
                .insert()
                .into(customer_activity_entity_1.CustomerActivity)
                .values(values)
                .execute();
        }
    }
    async deleteMultipleActivitiesAsync(ids) {
        await this.customerActivityRepository.delete({ id: (0, typeorm_2.In)(ids) });
    }
};
exports.CustomerActivityRepositoryPostgresql = CustomerActivityRepositoryPostgresql;
exports.CustomerActivityRepositoryPostgresql = CustomerActivityRepositoryPostgresql = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_activity_entity_1.CustomerActivity)),
    __param(1, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __param(2, (0, typeorm_1.InjectRepository)(daly_activities_entity_1.DalyActivities)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomerActivityRepositoryPostgresql);
//# sourceMappingURL=customer-activity-repository.postgresql.js.map