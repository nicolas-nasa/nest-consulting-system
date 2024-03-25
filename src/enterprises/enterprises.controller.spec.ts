import { UserEntity } from '@/users/entities/user.entity';
import { repositoryMockFactory } from '@/utils/mock.utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EnterprisesEntity } from './entities/enterprises.entity';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesService } from './enterprises.service';

describe('EnterprisesController', () => {
  let controller: EnterprisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterprisesController],
      providers: [
        EnterprisesService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(EnterprisesEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<EnterprisesController>(EnterprisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
