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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalyActivities = void 0;
const typeorm_1 = require("typeorm");
const activity_entity_1 = require("../activity/activity.entity");
const customer_entity_1 = require("../customer/customer.entity");
let DalyActivities = class DalyActivities {
    id;
    user;
    activity;
    completionDate;
    score;
};
exports.DalyActivities = DalyActivities;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity', { generatedIdentity: 'ALWAYS' }),
    __metadata("design:type", String)
], DalyActivities.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], DalyActivities.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => activity_entity_1.Activity, (activity) => activity.id),
    (0, typeorm_1.JoinColumn)({ name: 'activity_id' }),
    __metadata("design:type", activity_entity_1.Activity)
], DalyActivities.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: 'completion_date' }),
    __metadata("design:type", Date)
], DalyActivities.prototype, "completionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: false }),
    __metadata("design:type", Number)
], DalyActivities.prototype, "score", void 0);
exports.DalyActivities = DalyActivities = __decorate([
    (0, typeorm_1.Entity)('daly_activities')
], DalyActivities);
//# sourceMappingURL=daly_activities.entity.js.map