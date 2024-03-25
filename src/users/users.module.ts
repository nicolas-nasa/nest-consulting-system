import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EnterprisesEntity } from '@/enterprises/entities/enterprises.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EnterprisesEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
