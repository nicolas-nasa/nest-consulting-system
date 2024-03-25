import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { EnterprisesEntity } from '@/enterprises/entities/enterprises.entity';
import { PaginationDto } from '@/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EnterprisesEntity)
    private readonly enterpriseRepository: Repository<EnterprisesEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();

    if(!createUserDto.email && !createUserDto.telefone) throw new HttpException(`necessary email or telephone`, HttpStatus.BAD_REQUEST);

    const enterprise = await this.enterpriseRepository.findOneBy({
      cnpj: createUserDto.cnpj,
    });
    if(!enterprise) throw new HttpException(`enterprise not founded`, HttpStatus.BAD_REQUEST);

    user.id = createUserDto.id;
    user.nome = createUserDto.nome;
    user.cpf = createUserDto.cpf;
    user.rg = createUserDto.rg;
    user.data_nascimento = createUserDto.data_nascimento;
    user.email = createUserDto.email;
    user.telefone = createUserDto.telefone;
    user.endereco = createUserDto.endereco;
    user.setor = createUserDto.setor;
    user.cargo = createUserDto.cargo;
    user.enterprise = enterprise

    

    return this.userRepository.save(user);
  }

  findAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async listUsersByEnterprise(
    cnpj: string,
    query: PaginationDto,
  ): Promise<{ data: UserEntity[]; totalPages: number; actualPage: number }> {

    const enterprise = await this.enterpriseRepository.findOne( {where: { cnpj: Like(`%${cnpj}%`) } } )

    if (!enterprise)  throw new HttpException(`enterprise not found`, HttpStatus.BAD_REQUEST);

    const [result, total] = await this.userRepository.findAndCount({
      where: { enterprise },
      take: query.size,
      skip: query.page * query.size,
    });
    
    return {
      data: result,
      totalPages: parseFloat((total / query.size).toFixed(0)),
      actualPage: parseFloat(query.page + ''),
    };
  }

  viewUser(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    const enterprise = await this.enterpriseRepository.findOneBy({
      cnpj: updateUserDto.cnpj,
    });

    this.userRepository.findOneBy({ id });
    
    user.id = updateUserDto.id;
    user.nome = updateUserDto.nome;
    user.cpf = updateUserDto.cpf;
    user.rg = updateUserDto.rg;
    user.data_nascimento = updateUserDto.data_nascimento;
    user.email = updateUserDto.email;
    user.telefone = updateUserDto.telefone;
    user.endereco = updateUserDto.endereco;
    user.setor = updateUserDto.setor;
    user.cargo = updateUserDto.cargo;
    user.enterprise.id = enterprise.id
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
