import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepositoryPostgresql } from './customer-repository-postgresql.repository';

describe('CustomerRepositoryPostgresql', () => {
  let service: CustomerRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerRepositoryPostgresql],
    }).compile();

    service = module.get<CustomerRepositoryPostgresql>(CustomerRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
