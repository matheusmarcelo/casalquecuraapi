import { LinkedUsersDto } from "src/dtos/linked_users/linkedUsers.dto";
import { ILinkedUsersRepository } from "./ILinkedUsersRepository.contract";

export interface ILinkedUsersService extends Omit<ILinkedUsersRepository, 'getLinkedUsersByCustomersIdAsync' | 'createLinkedUsersTemporaryAsync' | 'createLinkedUsersAsync' | 'deleteLinkedUsersTemporaryAsync' | 'deleteLinkedUsersAsync' | 'getLinkedUsersSolicitationAsync'> {
    createLinkedUsersTemporaryAsync(linkedUsers: LinkedUsersDto): Promise<void>;
    createLinkedUsersAsync(solicitationId: string): Promise<void>;
    deleteLinkedUsersTemporaryAsync(customerId: string): Promise<void>;
    deleteLinkedUsersAsync(customerId: string): Promise<void>;
}