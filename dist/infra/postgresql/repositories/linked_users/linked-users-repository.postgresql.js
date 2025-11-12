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
exports.LinkedUsersRepositoryPostgresql = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aux_linked_users_entity_1 = require("../../../../entitites/linked-users/aux_linked_users.entity");
const linked_users_entity_1 = require("../../../../entitites/linked-users/linked_users.entity");
const typeorm_2 = require("typeorm");
let LinkedUsersRepositoryPostgresql = class LinkedUsersRepositoryPostgresql {
    auxLinkedUsersRepository;
    linkedUsersRepository;
    constructor(auxLinkedUsersRepository, linkedUsersRepository) {
        this.auxLinkedUsersRepository = auxLinkedUsersRepository;
        this.linkedUsersRepository = linkedUsersRepository;
    }
    async createLinkedUsersTemporaryAsync(linkedUsers) {
        await this.auxLinkedUsersRepository.save(linkedUsers);
    }
    async createLinkedUsersAsync(linkedUsers) {
        await this.linkedUsersRepository.save(linkedUsers);
    }
    async deleteLinkedUsersTemporaryAsync(id) {
        await this.auxLinkedUsersRepository.delete(id);
    }
    async deleteLinkedUsersAsync(id) {
        await this.linkedUsersRepository.delete(id);
    }
    async getLinkedUsersTemporaryAsync(customerId) {
        const response = await this.auxLinkedUsersRepository.findOne({
            where: [
                { from: { id: customerId } },
                { to: { id: customerId } },
            ],
            relations: ['from', 'to'],
            select: {
                id: true,
                expirateAt: true,
                from: {
                    id: true,
                    name: true
                },
                to: {
                    name: true,
                    email: true
                }
            }
        });
        if (!response)
            return null;
        const isRequester = response.from.id === customerId;
        return this.mapAuxLinkedUserToLinkedUserDto(response, isRequester);
    }
    async getLinkedUsersSolicitationAsync(id) {
        const solicitation = await this.auxLinkedUsersRepository.findOne({ where: { id }, relations: ['from', 'to'] });
        return solicitation;
    }
    async getLinkedUsersAsync(customerId) {
        return await this.linkedUsersRepository.findOne({
            where: [
                { user1: { id: customerId } },
                { user2: { id: customerId } }
            ],
            relations: ['user1', 'user2'],
            select: {
                id: true,
                user1: {
                    name: true
                },
                user2: {
                    name: true
                }
            }
        });
    }
    async getLinkedUsersByCustomersIdAsync(fromId, toId) {
        return await this.linkedUsersRepository.findOne({
            where: {
                user1: { id: fromId },
                user2: { id: toId },
            },
            relations: ['user1', 'user2']
        });
    }
    mapAuxLinkedUserToLinkedUserDto(linkedUser, isRequester) {
        return {
            id: linkedUser.id,
            fromId: linkedUser.from.id,
            emailReceiver: linkedUser.to.email,
            isRequester: isRequester,
            expirateAt: linkedUser.expirateAt,
        };
    }
};
exports.LinkedUsersRepositoryPostgresql = LinkedUsersRepositoryPostgresql;
exports.LinkedUsersRepositoryPostgresql = LinkedUsersRepositoryPostgresql = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aux_linked_users_entity_1.AuxLinkedUsers)),
    __param(1, (0, typeorm_1.InjectRepository)(linked_users_entity_1.LinkedUsers)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LinkedUsersRepositoryPostgresql);
//# sourceMappingURL=linked-users-repository.postgresql.js.map