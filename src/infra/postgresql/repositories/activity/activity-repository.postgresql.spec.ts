import { Test, TestingModule } from '@nestjs/testing';
import { ActivityRepositoryPostgresql } from './activity-repository.postgresql';

describe('ActivityService', () => {
  let service: ActivityRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityRepositoryPostgresql],
    }).compile();

    service = module.get<ActivityRepositoryPostgresql>(ActivityRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
