import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlanningDto } from './dto/planning.dto';
import { UserService } from '../user/user.service';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class PlanningService {
  private readonly logger = new Logger(PlanningService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly todoservice: TodoService,
    private readonly userservice: UserService,
  ) {}

  async create(body: CreatePlanningDto): Promise<boolean> {
    try {
      const user = await this.userservice.findOne(body.user);
      const todo = await this.todoservice.findOne(body.todo);

      if (!user || !todo) return false;
      if (!user.hasOwnProperty('todos')) user.initTodos();
      if (!todo.hasOwnProperty('users')) todo.initUsers();

      console.log(user, todo);
      user.todos.push(todo);
      await this.userRepository.save(user);
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
