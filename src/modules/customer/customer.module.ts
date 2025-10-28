import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService,
    {
      provide: DITokensService.CUSTOMER_SERVICE,
      useClass: CustomerService
    }
  ],
})
export class CustomerModule { }
