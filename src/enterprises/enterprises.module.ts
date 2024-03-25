import { UserEntity } from '@/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterprisesEntity } from './entities/enterprises.entity';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesService } from './enterprises.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnterprisesEntity, UserEntity])],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
})
export class EnterprisesModule {}
