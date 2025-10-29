import { Test, TestingModule } from '@nestjs/testing';
import { CustomerActivityRepositoryPostgresql } from './customer-activity-repository.postgresql';

describe('CustomerActivityService', () => {
  let service: CustomerActivityRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerActivityRepositoryPostgresql],
    }).compile();

    service = module.get<CustomerActivityRepositoryPostgresql>(CustomerActivityRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
