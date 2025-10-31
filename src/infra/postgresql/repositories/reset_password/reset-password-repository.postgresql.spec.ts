import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordRepositoryPostgresql } from './reset-password-repository.postgresql';

describe('ResetPasswordService', () => {
  let service: ResetPasswordRepositoryPostgresql;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPasswordRepositoryPostgresql],
    }).compile();

    service = module.get<ResetPasswordRepositoryPostgresql>(ResetPasswordRepositoryPostgresql);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
