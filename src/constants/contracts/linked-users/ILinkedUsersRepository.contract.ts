import { LinkedUsersDto } from "src/dtos/linked_users/linkedUsers.dto";
import { AuxLinkedUsers } from "src/entitites/linked-users/aux_linked_users.entity";
import { LinkedUsers } from "src/entitites/linked-users/linked_users.entity";

export interface ILinkedUsersRepository {
    createLinkedUsersTemporaryAsync(linkedUsers: AuxLinkedUsers): Promise<void>;
    createLinkedUsersAsync(linkedUsers: LinkedUsers): Promise<void>;
    deleteLinkedUsersTemporaryAsync(id: string): Promise<void>;
    deleteLinkedUsersAsync(id: string): Promise<void>;
    getLinkedUsersTemporaryAsync(customerId: string): Promise<LinkedUsersDto | null>;
    getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null>;
    getLinkedUsersByCustomersIdAsync(fromId: string, toId: string): Promise<LinkedUsers | null>;
}