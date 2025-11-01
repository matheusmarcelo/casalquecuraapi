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
exports.Customer = void 0;
const userRole_enum_1 = require("../../constants/enums/userRole.enum");
const typeorm_1 = require("typeorm");
const customer_activity_entity_1 = require("../customer-activity/customer-activity.entity");
const uuid_1 = require("uuid");
const aux_linked_users_entity_1 = require("../linked-users/aux_linked_users.entity");
const linked_users_entity_1 = require("../linked-users/linked_users.entity");
const daly_activities_entity_1 = require("../daly-activities/daly_activities.entity");
let Customer = class Customer {
    id;
    generateId() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
    name;
    email;
    password;
    date_of_birth;
    phone;
    street;
    neighborhood;
    zipcode;
    house_number;
    description;
    gender;
    role;
    createdAt;
    updatedAt;
    isActive;
    customers;
    user1;
    user2;
    fromAuxLinkedUsers;
    toAuxLinkedUsers;
    dalyActivities;
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Customer.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 150 }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Customer.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "house_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: userRole_enum_1.UserRoles.CUSTOMER }),
    __metadata("design:type", String)
], Customer.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => customer_activity_entity_1.CustomerActivity, (customer_activity) => customer_activity.customer),
    __metadata("design:type", Array)
], Customer.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => linked_users_entity_1.LinkedUsers, (linkedUsers) => linkedUsers.user1),
    __metadata("design:type", Array)
], Customer.prototype, "user1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => linked_users_entity_1.LinkedUsers, (linkedUsers) => linkedUsers.user2),
    __metadata("design:type", Array)
], Customer.prototype, "user2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => aux_linked_users_entity_1.AuxLinkedUsers, (auxLinkedUsers) => auxLinkedUsers.from),
    __metadata("design:type", Array)
], Customer.prototype, "fromAuxLinkedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => aux_linked_users_entity_1.AuxLinkedUsers, (auxLinkedUsers) => auxLinkedUsers.to),
    __metadata("design:type", Array)
], Customer.prototype, "toAuxLinkedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => daly_activities_entity_1.DalyActivities, (dalyActivities) => dalyActivities.id),
    __metadata("design:type", Array)
], Customer.prototype, "dalyActivities", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], Customer);
//# sourceMappingURL=customer.entity.js.map