import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import type { ILinkedUsersService } from 'src/constants/contracts/linked-users/ILinkedUsersService.contract';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';
import { LinkedUsersDto } from 'src/dtos/linked_users/linkedUsers.dto';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';

@Controller('linked/users')
export class LinkedUsersController {
  constructor(
    @Inject(DITokensService.LINKED_USERS_SERVICE)
    private readonly linkedUsersService: ILinkedUsersService
  ) { }

  @Post('solicitation')
  async createLinkedUsersTemporaryAsync(@Body() linkedUsers: LinkedUsersDto): Promise<void> {
    await this.linkedUsersService.createLinkedUsersTemporaryAsync(linkedUsers);
  }

  @Post('/:solicitationId')
  async createLinkedUsersAsync(@Param('solicitationId') solicitationId: string): Promise<void> {
    await this.linkedUsersService.createLinkedUsersAsync(solicitationId);
  }

  @Get('solicitation/:customerId')
  @HttpCode(HttpStatus.OK)
  async getLinkedUsersTemporaryAsync(@Param('customerId') customerId: string): Promise<LinkedUsersDto | null> {
    const linkedUsersTemporary = await this.linkedUsersService.getLinkedUsersTemporaryAsync(customerId);
    return linkedUsersTemporary;
  }

  @Get('/:customerId')
  @HttpCode(HttpStatus.OK)
  async getLinkedUsersAsync(@Param('customerId') customerId: string): Promise<LinkedUsers | null> {
    const linkedUsers = await this.linkedUsersService.getLinkedUsersAsync(customerId);

    return linkedUsers;
  }

  @Delete('solicitation/:customerId')
  @HttpCode(HttpStatus.OK)
  async deleteLinkedUsersTemporaryAsync(@Param('customerId') customerId: string): Promise<void> {
    await this.linkedUsersService.deleteLinkedUsersTemporaryAsync(customerId);
  }

  @Delete('/:customerId')
  @HttpCode(HttpStatus.OK)
  async deleteLinkedUsersAsync(@Param('customerId') customerId: string): Promise<void> {
    await this.linkedUsersService.deleteLinkedUsersAsync(customerId);
  }
}
