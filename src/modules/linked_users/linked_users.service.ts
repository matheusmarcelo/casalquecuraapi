import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import type { ICustomerRepository } from 'src/constants/contracts/customer/ICustomerRepository.contract';
import type { ILinkedUsersRepository } from 'src/constants/contracts/linked-users/ILinkedUsersRepository.contract';
import { ILinkedUsersService } from 'src/constants/contracts/linked-users/ILinkedUsersService.contract';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { LinkedUsersDto } from 'src/dtos/linked_users/linkedUsers.dto';
import { Customer } from 'src/entitites/customer/customer.entity';
import { AuxLinkedUsers } from 'src/entitites/linked-users/aux_linked_users.entity';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';

@Injectable()
export class LinkedUsersService implements ILinkedUsersService {

    constructor(
        @Inject(DITokensRepository.LINKED_USERS_REPOSITORY)
        private readonly linkedUsersRepository: ILinkedUsersRepository,
        @Inject(DITokensRepository.CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomerRepository,
    ) { }

    async createLinkedUsersTemporaryAsync(linkedUsers: LinkedUsersDto): Promise<void> {
        const receiver = await this.customerRepository.getCustomerByEmail(linkedUsers.emailReceiver);

        if (!receiver) {
            throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
        }

        const linkedUsersFound = await this.linkedUsersRepository.getLinkedUsersByCustomersIdAsync(
            linkedUsers.fromId,
            receiver.id!,
        );

        if (linkedUsersFound) {
            throw new HttpException('Those users already linked', HttpStatus.BAD_REQUEST);
        }

        const auxLinkedUsers: AuxLinkedUsers = {
            from: { id: linkedUsers.fromId } as Customer,
            to: { id: receiver.id! } as Customer,
        }

        await this.linkedUsersRepository.createLinkedUsersTemporaryAsync(auxLinkedUsers);
    }

    async createLinkedUsersAsync(solicitationId: string): Promise<void> {
        const solicitation = await this.linkedUsersRepository.getLinkedUsersSolicitationAsync(solicitationId);

        if (!solicitation) {
            throw new HttpException('Solicitation not found', HttpStatus.BAD_REQUEST);
        }

        const newLinkedUsers: LinkedUsers = {
            user1: { id: solicitation.from.id! } as Customer,
            user2: { id: solicitation.to.id! } as Customer,
        }

        await this.linkedUsersRepository.createLinkedUsersAsync(newLinkedUsers);
        await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(solicitationId);
    }

    async deleteLinkedUsersTemporaryAsync(customerId: string): Promise<void> {
        const linkedUsersTemporary = await this.linkedUsersRepository.getLinkedUsersTemporaryAsync(customerId);

        if (!linkedUsersTemporary) {
            throw new HttpException('Solicitation not found', HttpStatus.NOT_FOUND);
        }

        await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id!);
    }

    async deleteLinkedUsersAsync(customerId: string): Promise<void> {
        const linkedUsers = await this.linkedUsersRepository.getLinkedUsersAsync(customerId);

        if (!linkedUsers) {
            throw new HttpException('The linked users was not found', HttpStatus.NOT_FOUND);
        }

        await this.linkedUsersRepository.deleteLinkedUsersAsync(linkedUsers.id!);
    }

    async getLinkedUsersTemporaryAsync(customerId: string): Promise<LinkedUsersDto | null> {
        const linkedUsersTemporary = await this.linkedUsersRepository.getLinkedUsersTemporaryAsync(customerId);


        if (!linkedUsersTemporary) {
            throw new HttpException('Solicitation not found', HttpStatus.NOT_FOUND);
        }

        if (!linkedUsersTemporary.expirateAt) {
            await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id!);
            throw new HttpException('The request to link the accounts has expired.', HttpStatus.BAD_REQUEST);
        }

        if (linkedUsersTemporary.isRequester) {
            const expirationDate = new Date(linkedUsersTemporary.expirateAt);
            expirationDate.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (expirationDate < today) {
                await this.linkedUsersRepository.deleteLinkedUsersTemporaryAsync(linkedUsersTemporary.id!);
                throw new HttpException('This link or request has expired. Please initiate a new one', HttpStatus.GONE);
            }
        }

        return linkedUsersTemporary;
    }

    async getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null> {
        const linkedUsers = await this.linkedUsersRepository.getLinkedUsersAsync(customerId);

        if (!linkedUsers) {
            throw new HttpException('The linked users was not found', HttpStatus.NOT_FOUND);
        }

        return linkedUsers;
    }

}
