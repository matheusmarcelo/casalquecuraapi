import { Test, TestingModule } from '@nestjs/testing';
import { LinkedUsersRepositoryPostgresql } from './linked-users-repository.postgresql';

describe('LinkedUsersService', () => {
  let service: LinkedUsersRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkedUsersRepositoryPostgresql],
    }).compile();

    service = module.get<LinkedUsersRepositoryPostgresql>(LinkedUsersRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
