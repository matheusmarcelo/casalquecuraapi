import { Test, TestingModule } from '@nestjs/testing';
import { DalyActivitiesRepositoryPostgresql } from './daly-activities-repository.postgresql';

describe('DalyActivitiesService', () => {
  let service: DalyActivitiesRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalyActivitiesRepositoryPostgresql],
    }).compile();

    service = module.get<DalyActivitiesRepositoryPostgresql>(DalyActivitiesRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
