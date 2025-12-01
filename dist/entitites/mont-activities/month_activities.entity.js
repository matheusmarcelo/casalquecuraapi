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
exports.MonthActivities = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const linked_users_entity_1 = require("../linked-users/linked_users.entity");
let MonthActivities = class MonthActivities {
    id;
    user;
    totalScore;
    month;
    year;
    linkedUserId;
};
exports.MonthActivities = MonthActivities;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity', { generatedIdentity: 'ALWAYS' }),
    __metadata("design:type", String)
], MonthActivities.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], MonthActivities.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_score', type: 'decimal' }),
    __metadata("design:type", Number)
], MonthActivities.prototype, "totalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], MonthActivities.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], MonthActivities.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => linked_users_entity_1.LinkedUsers, (linkedUsers) => linkedUsers.id),
    (0, typeorm_1.JoinColumn)({ name: 'linked_user_id' }),
    __metadata("design:type", linked_users_entity_1.LinkedUsers)
], MonthActivities.prototype, "linkedUserId", void 0);
exports.MonthActivities = MonthActivities = __decorate([
    (0, typeorm_1.Entity)('month_activities')
], MonthActivities);
//# sourceMappingURL=month_activities.entity.js.map