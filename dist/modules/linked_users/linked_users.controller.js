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
exports.LinkedUsersController = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const linkedUsers_dto_1 = require("../../dtos/linked_users/linkedUsers.dto");
let LinkedUsersController = class LinkedUsersController {
    linkedUsersService;
    constructor(linkedUsersService) {
        this.linkedUsersService = linkedUsersService;
    }
    async createLinkedUsersTemporaryAsync(linkedUsers) {
        await this.linkedUsersService.createLinkedUsersTemporaryAsync(linkedUsers);
    }
    async createLinkedUsersAsync(solicitationId) {
        await this.linkedUsersService.createLinkedUsersAsync(solicitationId);
    }
    async getLinkedUsersTemporaryAsync(customerId) {
        const linkedUsersTemporary = await this.linkedUsersService.getLinkedUsersTemporaryAsync(customerId);
        return linkedUsersTemporary;
    }
    async getLinkedUsersAsync(customerId) {
        const linkedUsers = await this.linkedUsersService.getLinkedUsersAsync(customerId);
        return linkedUsers;
    }
    async deleteLinkedUsersTemporaryAsync(customerId) {
        await this.linkedUsersService.deleteLinkedUsersTemporaryAsync(customerId);
    }
    async deleteLinkedUsersAsync(customerId) {
        await this.linkedUsersService.deleteLinkedUsersAsync(customerId);
    }
};
exports.LinkedUsersController = LinkedUsersController;
__decorate([
    (0, common_1.Post)('solicitation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linkedUsers_dto_1.LinkedUsersDto]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "createLinkedUsersTemporaryAsync", null);
__decorate([
    (0, common_1.Post)('/:solicitationId'),
    __param(0, (0, common_1.Param)('solicitationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "createLinkedUsersAsync", null);
__decorate([
    (0, common_1.Get)('solicitation/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "getLinkedUsersTemporaryAsync", null);
__decorate([
    (0, common_1.Get)('/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "getLinkedUsersAsync", null);
__decorate([
    (0, common_1.Delete)('solicitation/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "deleteLinkedUsersTemporaryAsync", null);
__decorate([
    (0, common_1.Delete)('/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('customerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkedUsersController.prototype, "deleteLinkedUsersAsync", null);
exports.LinkedUsersController = LinkedUsersController = __decorate([
    (0, common_1.Controller)('linked/users'),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.LINKED_USERS_SERVICE)),
    __metadata("design:paramtypes", [Object])
], LinkedUsersController);
//# sourceMappingURL=linked_users.controller.js.map