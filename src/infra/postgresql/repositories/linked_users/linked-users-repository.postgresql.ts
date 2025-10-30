import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILinkedUsersRepository } from 'src/constants/contracts/linked-users/ILinkedUsersRepository.contract';
import { LinkedUsersDto } from 'src/dtos/linked_users/linkedUsers.dto';
import { AuxLinkedUsers } from 'src/entitites/linked-users/aux_linked_users.entity';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkedUsersRepositoryPostgresql implements ILinkedUsersRepository {

    constructor(
        @InjectRepository(AuxLinkedUsers)
        private readonly auxLinkedUsersRepository: Repository<AuxLinkedUsers>,
        @InjectRepository(LinkedUsers)
        private readonly linkedUsersRepository: Repository<LinkedUsers>,
    ) { }

    async createLinkedUsersTemporaryAsync(linkedUsers: AuxLinkedUsers): Promise<void> {
        await this.auxLinkedUsersRepository.save(linkedUsers);
    }

    async createLinkedUsersAsync(linkedUsers: LinkedUsers): Promise<void> {
        await this.linkedUsersRepository.save(linkedUsers);
    }

    async deleteLinkedUsersTemporaryAsync(id: string): Promise<void> {
        await this.auxLinkedUsersRepository.delete(id);
    }

    async deleteLinkedUsersAsync(id: string): Promise<void> {
        await this.linkedUsersRepository.delete(id);
    }

    async getLinkedUsersTemporaryAsync(customerId: string): Promise<LinkedUsersDto | null> {
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
                    id: true,
                    name: true
                }
            }
        });

        if (!response) return null;

        const isRequester = response.from.id === customerId;
        return this.mapAuxLinkedUserToLinkedUserDto(response, isRequester);
    }

    async getLinkedUsersSolicitationAsync(id: string): Promise<AuxLinkedUsers | null> {
        const solicitation = await this.auxLinkedUsersRepository.findOne({ where: { id }, relations: ['from', 'to'] });
        return solicitation;
    }

    async getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null> {
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

    async getLinkedUsersByCustomersIdAsync(fromId: string, toId: string): Promise<LinkedUsers | null> {
        return await this.linkedUsersRepository.findOne({
            where: {
                user1: { id: fromId },
                user2: { id: toId },
            },
            relations: ['user1', 'user2']
        });
    }

    private mapAuxLinkedUserToLinkedUserDto(linkedUser: AuxLinkedUsers, isRequester: boolean): LinkedUsersDto {
        return {
            id: linkedUser.id,
            fromId: linkedUser.from.id!,
            toId: linkedUser.to.id!,
            isRequester: isRequester,
            expirateAt: linkedUser.expirateAt,
        };
    }
}
