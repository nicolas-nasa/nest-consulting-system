import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UUID , randomUUID} from 'crypto';

export class CreateEnterpriseDto {
  @ApiProperty()
  id?: UUID = randomUUID();

  @ApiProperty()
  @IsString()
  cnpj: string;

  constructor(CreateEnterpriseDto) {
    Object.assign(this, CreateEnterpriseDto);
  }
}
