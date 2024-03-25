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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { PaginationDto } from '@/dto/pagination.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }


  @Get()
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':cnpj')
  getUsersByEnterprise(
    @Param('cnpj') cnpj: string,
    @Query() query: PaginationDto,
  ): Promise<{ data: UserEntity[]; totalPages: number; actualPage: number }> {
    return this.usersService.listUsersByEnterprise(cnpj, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.viewUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
