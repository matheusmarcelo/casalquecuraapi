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
exports.DalyActivitiesRepositoryPostgresql = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const daly_activities_entity_1 = require("../../../../entitites/daly-activities/daly_activities.entity");
const typeorm_2 = require("typeorm");
let DalyActivitiesRepositoryPostgresql = class DalyActivitiesRepositoryPostgresql {
    dalyActivityRepository;
    constructor(dalyActivityRepository) {
        this.dalyActivityRepository = dalyActivityRepository;
    }
    async createDalyActivityAsync(entity) {
        await this.dalyActivityRepository.save(entity);
    }
    async getDalyActivitiesAsync(customerId) {
        return this.dalyActivityRepository.find({
            where: {
                user: { id: customerId },
                completionDate: new Date()
            }
        });
    }
};
exports.DalyActivitiesRepositoryPostgresql = DalyActivitiesRepositoryPostgresql;
exports.DalyActivitiesRepositoryPostgresql = DalyActivitiesRepositoryPostgresql = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(daly_activities_entity_1.DalyActivities)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DalyActivitiesRepositoryPostgresql);
//# sourceMappingURL=daly-activities-repository.postgresql.js.map