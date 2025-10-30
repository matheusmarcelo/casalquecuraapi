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
exports.LinkedUsersService = void 0;
const common_1 = require("@nestjs/common");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
let LinkedUsersService = class LinkedUsersService {
    linkedUsersRepository;
    constructor(linkedUsersRepository) {
        this.linkedUsersRepository = linkedUsersRepository;
    }
    async createLinkedUsersTemporaryAsync(linkedUsers) {
        const linkedUsersFound = await this.linkedUsersRepository.getLinkedUsersByCustomersIdAsync(linkedUsers.fromId, linkedUsers.toId);
        console.log(linkedUsersFound);
        if (linkedUsersFound) {
            throw new common_1.HttpException('Those users already linked', common_1.HttpStatus.BAD_REQUEST);
        }
        const auxLinkedUsers = {
            from: { id: linkedUsers.fromId },
            to: { id: linkedUsers.toId },
        };
        await this.linkedUsersRepository.createLinkedUsersTemporaryAsync(auxLinkedUsers);
    }
    async createLinkedUsersAsync(solicitationId) {
        const solicitation = await this.linkedUsersRepository.getLinkedUsersSolicitationAsync(solicitationId);
        if (!solicitation) {
            throw new common_1.HttpException('Solicitation not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const newLinkedUsers = {
            user1: { id: solicitation.from.id },
            user2: { id: solicitation.to.id },
        };
        await this.linkedUsersRepository.createLinkedUsersAsync(newLinkedUsers);
        await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(solicitationId);
    }
    async deleteLinkedUsersTemporaryAsync(customerId) {
        const linkedUsersTemporary = await this.linkedUsersRepository.getLinkedUsersTemporaryAsync(customerId);
        if (!linkedUsersTemporary) {
            throw new common_1.HttpException('Solicitation not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id);
    }
    async deleteLinkedUsersAsync(customerId) {
        const linkedUsers = await this.linkedUsersRepository.getLinkedUsersAsync(customerId);
        if (!linkedUsers) {
            throw new common_1.HttpException('The linked users was not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.linkedUsersRepository.deleteLinkedUsersAsync(linkedUsers.id);
    }
    async getLinkedUsersTemporaryAsync(customerId) {
        const linkedUsersTemporary = await this.linkedUsersRepository.getLinkedUsersTemporaryAsync(customerId);
        if (!linkedUsersTemporary) {
            throw new common_1.HttpException('Solicitation not found', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(linkedUsersTemporary);
        if (!linkedUsersTemporary.expirateAt) {
            await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id);
            throw new common_1.HttpException('The request to link the accounts has expired.', common_1.HttpStatus.BAD_REQUEST);
        }
        if (linkedUsersTemporary.isRequester) {
            const expirationDate = new Date(linkedUsersTemporary.expirateAt);
            expirationDate.setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (expirationDate < today) {
                await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id);
                throw new common_1.HttpException('This link or request has expired. Please initiate a new one', common_1.HttpStatus.GONE);
            }
        }
        return linkedUsersTemporary;
    }
    async getLinkedUsersAsync(customerId) {
        const linkedUsers = await this.linkedUsersRepository.getLinkedUsersAsync(customerId);
        if (!linkedUsers) {
            throw new common_1.HttpException('The linked users was not found', common_1.HttpStatus.NOT_FOUND);
        }
        return linkedUsers;
    }
};
exports.LinkedUsersService = LinkedUsersService;
exports.LinkedUsersService = LinkedUsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.LINKED_USERS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], LinkedUsersService);
//# sourceMappingURL=linked_users.service.js.map