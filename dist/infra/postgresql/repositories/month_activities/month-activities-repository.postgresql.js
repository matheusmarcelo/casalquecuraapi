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
exports.MonthActivitiesRepositoryPostgresql = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const daly_activities_entity_1 = require("../../../../entitites/daly-activities/daly_activities.entity");
const month_activities_entity_1 = require("../../../../entitites/mont-activities/month_activities.entity");
const numeric_helpers_1 = require("../../../../helpers/numeric.helpers");
const typeorm_2 = require("typeorm");
let MonthActivitiesRepositoryPostgresql = class MonthActivitiesRepositoryPostgresql {
    monthActivityRepository;
    dalyActivityRepository;
    constructor(monthActivityRepository, dalyActivityRepository) {
        this.monthActivityRepository = monthActivityRepository;
        this.dalyActivityRepository = dalyActivityRepository;
    }
    async createMonthActivityAsync(entity) {
        await this.monthActivityRepository.save(entity);
    }
    async updateMonthActivityAsync(id, totalScore) {
        await this.monthActivityRepository.update(id, { totalScore });
    }
    async getMonthActivityAsync(month, year, customerOrLinkedUserId) {
        const isNumeric = new numeric_helpers_1.NumericHelper().isNumeric(customerOrLinkedUserId || '0');
        if (isNumeric) {
            return await this.monthActivityRepository.findOne({
                where: {
                    linkedUserId: { id: customerOrLinkedUserId },
                    month,
                    year
                }
            });
        }
        else {
            return await this.monthActivityRepository.findOne({
                where: {
                    user: { id: customerOrLinkedUserId },
                    month,
                    year
                }
            });
        }
    }
    async getMonthlyActivitiesAsync(customerOrLinkedUserId) {
        const isNumeric = new numeric_helpers_1.NumericHelper().isNumeric(customerOrLinkedUserId);
        if (isNumeric) {
            return await this.monthActivityRepository.find({
                where: { user: { id: customerOrLinkedUserId } }
            });
        }
        else {
            return await this.monthActivityRepository.find({
                where: { linkedUserId: { id: customerOrLinkedUserId } }
            });
        }
    }
    async getTotalMonthActivitiesAsync(customerOrLinkedUserId) {
        const isNumeric = new numeric_helpers_1.NumericHelper().isNumeric(customerOrLinkedUserId);
        const totalActivitiesThisMonth = this.dalyActivityRepository
            .createQueryBuilder('activity');
        if (isNumeric) {
            totalActivitiesThisMonth.where('activity.linked_user_id = :userId', { userId: customerOrLinkedUserId });
        }
        else {
            totalActivitiesThisMonth.where('activity.user_id = :userId', { userId: customerOrLinkedUserId });
        }
        const data = await totalActivitiesThisMonth.andWhere(`activity.completion_date BETWEEN 
            date_trunc('month', CURRENT_DATE) AND CURRENT_TIMESTAMP`).getCount();
        return data || 0;
    }
};
exports.MonthActivitiesRepositoryPostgresql = MonthActivitiesRepositoryPostgresql;
exports.MonthActivitiesRepositoryPostgresql = MonthActivitiesRepositoryPostgresql = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(month_activities_entity_1.MonthActivities)),
    __param(1, (0, typeorm_1.InjectRepository)(daly_activities_entity_1.DalyActivities)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MonthActivitiesRepositoryPostgresql);
//# sourceMappingURL=month-activities-repository.postgresql.js.map