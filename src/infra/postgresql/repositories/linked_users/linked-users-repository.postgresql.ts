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
        const requester = await this.auxLinkedUsersRepository.findOne({
            where: {
                from: { id: customerId }
            },
            relations: ['to']
        });

        if (!requester) {
            const receiver = await this.auxLinkedUsersRepository.findOne({
                where: {
                    to: { id: customerId }
                },
                relations: ['from']
            });

            if (!receiver) {
                return null;
            }

            const isRequester = false;
            return this.mapAuxLinkedUserToLinkedUserDto(receiver, isRequester);
        }

        const isRequester = true;
        return this.mapAuxLinkedUserToLinkedUserDto(requester, isRequester);
    }

    async getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null> {
        return await this.linkedUsersRepository.findOne({
            where: [
                { user1: { id: customerId } },
                { user2: { id: customerId } }
            ],
            relations: ['user1', 'user2']
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
            fromId: linkedUser.from.id!,
            toId: linkedUser.to.id!,
            isRequester: isRequester,
        };
    }
}
