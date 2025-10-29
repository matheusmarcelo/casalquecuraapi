import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './infra/db.module';
import { ActivityModule } from './modules/activity/activity.module';
import { CustomerActivityModule } from './modules/customer_activity/customer_activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    DBModule,
    ActivityModule,
    CustomerActivityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
