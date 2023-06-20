import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StatusService } from 'src/status/status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Status])],
  controllers: [UserController],
  providers: [UserService, StatusService],
})
export class UserModule {}
