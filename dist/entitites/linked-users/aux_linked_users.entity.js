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
exports.AuxLinkedUsers = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
let AuxLinkedUsers = class AuxLinkedUsers {
    id;
    from;
    to;
    expirateAt;
    createdAt;
};
exports.AuxLinkedUsers = AuxLinkedUsers;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity', { generatedIdentity: 'ALWAYS' }),
    __metadata("design:type", String)
], AuxLinkedUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'from_user_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], AuxLinkedUsers.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'to_user_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], AuxLinkedUsers.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expirate_at', type: 'date', default: () => "CURRENT_DATE + INTERVAL '2 days'" }),
    __metadata("design:type", Date)
], AuxLinkedUsers.prototype, "expirateAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], AuxLinkedUsers.prototype, "createdAt", void 0);
exports.AuxLinkedUsers = AuxLinkedUsers = __decorate([
    (0, typeorm_1.Entity)('aux_linked_users')
], AuxLinkedUsers);
//# sourceMappingURL=aux_linked_users.entity.js.map