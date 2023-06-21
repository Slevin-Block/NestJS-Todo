import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Todo } from 'src/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { UserService } from 'src/user/user.service';
import { StatusService } from 'src/status/status.service';
import { Status } from 'src/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User, Status])],
  controllers: [PlanningController],
  providers: [PlanningService, UserService, TodoService, StatusService],
})
export class PlanningModule {}
