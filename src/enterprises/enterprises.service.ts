import { PaginationDto } from '@/dto/pagination.dto';
import { UserEntity } from '@/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { EnterprisesEntity } from './entities/enterprises.entity';
import { UUID } from 'crypto';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(EnterprisesEntity)
    private readonly entityRepository: Repository<EnterprisesEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createEnterpriseDto: CreateEnterpriseDto): Promise<EnterprisesEntity> {
    const enterprise: EnterprisesEntity = new EnterprisesEntity();

    const exist = await this.entityRepository.findOne({where: { cnpj: createEnterpriseDto.cnpj }})
    if(exist) throw new HttpException(`enterprise alredy created`, HttpStatus.BAD_REQUEST);


    enterprise.id = createEnterpriseDto.id;
    enterprise.cnpj = createEnterpriseDto.cnpj;
    
    return this.entityRepository.save(enterprise);
  }

  async listEnterprises(
    query: PaginationDto,
  ): Promise<{ data: EnterprisesEntity[]; totalPages: number; actualPage: number }> {
    const [result, total] = await this.entityRepository.findAndCount({
      take: query.size,
      skip: query.page * query.size,
    });
    return {
      data: result,
      totalPages: parseFloat((total / query.size).toFixed(0)),
      actualPage: parseFloat(query.page + ''),
    };
  }

  async update(id: UUID, updateEnterpriseDto: UpdateEnterpriseDto): Promise<EnterprisesEntity> {
    let enterprise = await this.entityRepository.findOne({
     where: { id }
    });
    enterprise.id = updateEnterpriseDto.id;
    enterprise.cnpj = updateEnterpriseDto.cnpj;

    return this.entityRepository.save(enterprise);
  }

  remove(id: string) {
    return this.entityRepository.softDelete(id);
  }
}
