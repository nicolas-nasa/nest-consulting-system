import { PaginationDto } from '@/dto/pagination.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { EnterprisesEntity } from './entities/enterprises.entity';
import { EnterprisesService } from './enterprises.service';
import { UUID } from 'crypto';

@ApiTags('enterprises')
@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterpriseService: EnterprisesService) {}

  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto): Promise<EnterprisesEntity> {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @Get('')
  listEnterprises(
    @Query() query: PaginationDto,
  ): Promise<{ data: EnterprisesEntity[]; totalPages: number; actualPage: number }> {
    return this.enterpriseService.listEnterprises(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<EnterprisesEntity> {
    return this.enterpriseService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.enterpriseService.remove(id);
  }
}
