import { Module } from '@nestjs/common';
import { LinkedUsersService } from './linked_users.service';
import { LinkedUsersController } from './linked_users.controller';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';

@Module({
  controllers: [LinkedUsersController],
  providers: [
    {
      provide: DITokensService.LINKED_USERS_SERVICE,
      useClass: LinkedUsersService
    }
  ],
})
export class LinkedUsersModule { }
