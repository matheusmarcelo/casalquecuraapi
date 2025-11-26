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
    async getMonthActivityAsync(customerId, month, year) {
        return await this.monthActivityRepository.findOne({
            where: {
                user: { id: customerId },
                month,
                year
            }
        });
    }
    async getMonthlyActivitiesAsync(customerId) {
        return await this.monthActivityRepository.find({ where: { user: { id: customerId } } });
    }
    async getTotalMonthActivitiesAsync(customerId) {
        const totalActivitiesThisMonth = await this.dalyActivityRepository
            .createQueryBuilder('activity')
            .where('activity.user_id = :userId', { userId: customerId })
            .andWhere(`activity.completion_date BETWEEN 
            date_trunc('month', CURRENT_DATE) AND CURRENT_DATE`)
            .getCount();
        return totalActivitiesThisMonth || 0;
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