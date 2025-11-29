import { ILinkedUsersRepository } from 'src/constants/contracts/linked-users/ILinkedUsersRepository.contract';
import { LinkedUsersDto } from 'src/dtos/linked_users/linkedUsers.dto';
import { AuxLinkedUsers } from 'src/entitites/linked-users/aux_linked_users.entity';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';
import { Repository } from 'typeorm';
export declare class LinkedUsersRepositoryPostgresql implements ILinkedUsersRepository {
    private readonly auxLinkedUsersRepository;
    private readonly linkedUsersRepository;
    constructor(auxLinkedUsersRepository: Repository<AuxLinkedUsers>, linkedUsersRepository: Repository<LinkedUsers>);
    createLinkedUsersTemporaryAsync(linkedUsers: AuxLinkedUsers): Promise<void>;
    createLinkedUsersAsync(linkedUsers: LinkedUsers): Promise<void>;
    deleteLinkedUsersTemporaryAsync(id: string): Promise<void>;
    deleteLinkedUsersAsync(id: string): Promise<void>;
    getLinkedUsersTemporaryAsync(customerId: string): Promise<LinkedUsersDto | null>;
    getLinkedUsersSolicitationAsync(id: string): Promise<AuxLinkedUsers | null>;
    getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null>;
    getLinkedUsersByCustomersIdAsync(fromId: string, toId: string): Promise<LinkedUsers | null>;
    private mapAuxLinkedUserToLinkedUserDto;
}
