import { ILinkedUsersRepository } from "./ILinkedUsersRepository.contract";

export interface ILinkedUsersService extends Omit<ILinkedUsersRepository, 'getLinkedUsersByCustomersIdAsync'> { }