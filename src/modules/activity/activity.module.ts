import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { DITokensService } from 'src/constants/enums/DITokens/DITokens.enum';

@Module({
  controllers: [ActivityController],
  providers: [
    {
      provide: DITokensService.ACTIVITY_SERVICE,
      useClass: ActivityService
    }
  ],
})
export class ActivityModule { }
