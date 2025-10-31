import { Test, TestingModule } from '@nestjs/testing';
import { MonthActivitiesRepositoryPostgresql } from './month-activities-repository.postgresql';

describe('MonthActivitiesRepositoryPostgresql', () => {
  let service: MonthActivitiesRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthActivitiesRepositoryPostgresql],
    }).compile();

    service = module.get<MonthActivitiesRepositoryPostgresql>(MonthActivitiesRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
