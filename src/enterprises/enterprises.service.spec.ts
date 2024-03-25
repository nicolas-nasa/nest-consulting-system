import { UserEntity } from '@/users/entities/user.entity';
import { MockType, repositoryMockFactory } from '@/utils/mock.utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterprisesEntity } from './entities/enterprises.entity';
import { EnterprisesService } from './enterprises.service';

describe('EnterpriseService', () => {
  let service: EnterprisesService;
  let repositoryMockUser: MockType<Repository<UserEntity>>;
  let repositoryMockEnterprise: MockType<Repository<EnterprisesEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<EnterprisesService>(EnterprisesService);
    repositoryMockUser = module.get(getRepositoryToken(UserEntity));
    repositoryMockEnterprise = module.get(getRepositoryToken(EnterprisesEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMockUser).toBeDefined();
    expect(repositoryMockEnterprise).toBeDefined();
  });
});
