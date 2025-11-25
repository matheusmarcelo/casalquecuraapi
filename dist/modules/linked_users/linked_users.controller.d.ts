import type { ILinkedUsersService } from 'src/constants/contracts/linked-users/ILinkedUsersService.contract';
import { LinkedUsersDto } from 'src/dtos/linked_users/linkedUsers.dto';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';
export declare class LinkedUsersController {
    private readonly linkedUsersService;
    constructor(linkedUsersService: ILinkedUsersService);
    createLinkedUsersTemporaryAsync(linkedUsers: LinkedUsersDto): Promise<void>;
    createLinkedUsersAsync(solicitationId: string): Promise<void>;
    getLinkedUsersTemporaryAsync(customerId: string): Promise<LinkedUsersDto | null>;
    getLinkedUsersAsync(customerId: string): Promise<LinkedUsers | null>;
    deleteLinkedUsersTemporaryAsync(customerId: string): Promise<void>;
    deleteLinkedUsersAsync(customerId: string): Promise<void>;
}
