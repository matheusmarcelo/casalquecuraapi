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
exports.CustomerDto = void 0;
const class_validator_1 = require("class-validator");
class CustomerDto {
    name;
    email;
    password;
    date_of_birth;
    phone;
}
exports.CustomerDto = CustomerDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string type' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Max 255 character for name' }),
    (0, class_validator_1.MinLength)(1, { message: 'Min 1 character for name' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name must have a value' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email must be a string type' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Max 50 character for email' }),
    (0, class_validator_1.MinLength)(1, { message: 'Min 1 character for email' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email must have a value' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string type' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Max 255 character for password' }),
    (0, class_validator_1.MinLength)(1, { message: 'Min 1 character for password' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password must have a value' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date of birth must have a value' }),
    __metadata("design:type", Date)
], CustomerDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Phone must be a string type' }),
    (0, class_validator_1.MaxLength)(25, { message: 'Max 25 character for phone' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone must have a value' }),
    __metadata("design:type", String)
], CustomerDto.prototype, "phone", void 0);
//# sourceMappingURL=customer.dto.js.map