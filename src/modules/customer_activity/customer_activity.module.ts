import { Module } from '@nestjs/common';
import { CustomerActivityService } from './customer_activity.service';
import { CustomerActivityController } from './customer_activity.controller';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';

@Module({
  controllers: [CustomerActivityController],
  providers: [
    {
      provide: DITokensService.CUSTOMER_ACTIVITY_SERVICE,
      useClass: CustomerActivityService
    }
  ],
})
export class CustomerActivityModule { }
