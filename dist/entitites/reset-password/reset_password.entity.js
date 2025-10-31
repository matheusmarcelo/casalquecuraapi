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
exports.ResetPassword = void 0;
const typeorm_1 = require("typeorm");
let ResetPassword = class ResetPassword {
    id;
    token;
    ipAddress;
    validated;
    expiresIn;
    createdAt;
};
exports.ResetPassword = ResetPassword;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity', { generatedIdentity: 'ALWAYS' }),
    __metadata("design:type", String)
], ResetPassword.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: false }),
    __metadata("design:type", String)
], ResetPassword.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', length: 45, nullable: false }),
    __metadata("design:type", String)
], ResetPassword.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'validated', type: 'bit' }),
    __metadata("design:type", Boolean)
], ResetPassword.prototype, "validated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_in', type: 'timestamp', default: () => "CURRENT_TIMESTAMP + INTERVAL '30 minutes'" }),
    __metadata("design:type", Date)
], ResetPassword.prototype, "expiresIn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ResetPassword.prototype, "createdAt", void 0);
exports.ResetPassword = ResetPassword = __decorate([
    (0, typeorm_1.Entity)('reset_password')
], ResetPassword);
//# sourceMappingURL=reset_password.entity.js.map