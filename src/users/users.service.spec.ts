import { MockType, repositoryMockFactory } from '@/utils/mock.utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { EnterprisesEntity } from '@/enterprises/entities/enterprises.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<UserEntity>>;
  let repositoryMockEnterprise: MockType<Repository<EnterprisesEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
    repositoryMockEnterprise = module.get(getRepositoryToken(EnterprisesEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });
});
