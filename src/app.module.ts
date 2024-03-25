import { typeOrmConfig } from '@/configs/database.service';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnterprisesModule } from './enterprises/enterprises.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    EnterprisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
