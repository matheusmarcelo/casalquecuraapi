import { Test, TestingModule } from '@nestjs/testing';
import { LinkedUsersController } from './linked_users.controller';
import { LinkedUsersService } from './linked_users.service';

describe('LinkedUsersController', () => {
  let controller: LinkedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkedUsersController],
      providers: [LinkedUsersService],
    }).compile();

    controller = module.get<LinkedUsersController>(LinkedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
