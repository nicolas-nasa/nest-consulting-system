import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UUID, randomUUID } from 'crypto';

export class CreateUserDto {
  @ApiProperty()
  id?: UUID = randomUUID();

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  rg: string;

  @ApiProperty()
  @IsNotEmpty()
  data_nascimento: Date;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  telefone?: string;

  @ApiProperty()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty()
  @IsNotEmpty()
  setor: string;

  @ApiProperty()
  @IsNotEmpty()
  cargo: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj: string;
  
  constructor(CreateUserDto) {
    Object.assign(this, CreateUserDto);
  }
}
