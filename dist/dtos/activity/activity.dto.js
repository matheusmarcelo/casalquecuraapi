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
exports.ActivityDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ActivityDto {
    title;
    description;
    score;
    isGeneral;
    customerIds;
    id;
}
exports.ActivityDto = ActivityDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Title must be a string type' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Max 100 character for title' }),
    (0, class_validator_1.MinLength)(3, { message: 'Min 3 character for title' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title must have a value' }),
    __metadata("design:type", String)
], ActivityDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description must have a value' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Max 255 character for description' }),
    (0, class_validator_1.MinLength)(3, { message: 'Min 3 character for description' }),
    __metadata("design:type", String)
], ActivityDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Score must be a number type' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1, { message: 'Min 1 point for score' }),
    (0, class_validator_1.Max)(100, { message: 'Max 100 point for score' }),
    __metadata("design:type", Number)
], ActivityDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isGeneral must be a boolean type' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ActivityDto.prototype, "isGeneral", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.isGeneral === false),
    (0, class_validator_1.IsNotEmpty)({ message: 'CustomerIds must be a value' }),
    (0, class_validator_1.IsArray)({ message: 'CustomerIds must be a array type' }),
    __metadata("design:type", Array)
], ActivityDto.prototype, "customerIds", void 0);
//# sourceMappingURL=activity.dto.js.map