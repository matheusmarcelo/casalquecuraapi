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
exports.LinkedUsers = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const customer_activity_entity_1 = require("../customer-activity/customer-activity.entity");
const daly_activities_entity_1 = require("../daly-activities/daly_activities.entity");
const month_activities_entity_1 = require("../mont-activities/month_activities.entity");
let LinkedUsers = class LinkedUsers {
    id;
    user1;
    user2;
    createdAt;
    customerActivities;
    dalyActivities;
    monthActivities;
};
exports.LinkedUsers = LinkedUsers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity', { generatedIdentity: 'ALWAYS' }),
    __metadata("design:type", String)
], LinkedUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id1' }),
    __metadata("design:type", customer_entity_1.Customer)
], LinkedUsers.prototype, "user1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id2' }),
    __metadata("design:type", customer_entity_1.Customer)
], LinkedUsers.prototype, "user2", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], LinkedUsers.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => customer_activity_entity_1.CustomerActivity, (customer_activity) => customer_activity.id),
    __metadata("design:type", Array)
], LinkedUsers.prototype, "customerActivities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => daly_activities_entity_1.DalyActivities, (daly_activities) => daly_activities.id),
    __metadata("design:type", Array)
], LinkedUsers.prototype, "dalyActivities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => month_activities_entity_1.MonthActivities, (month_activities) => month_activities.id),
    __metadata("design:type", Array)
], LinkedUsers.prototype, "monthActivities", void 0);
exports.LinkedUsers = LinkedUsers = __decorate([
    (0, typeorm_1.Entity)('linked_users')
], LinkedUsers);
//# sourceMappingURL=linked_users.entity.js.map