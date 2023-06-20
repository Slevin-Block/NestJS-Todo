import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = this.todoRepository
        .createQueryBuilder('todo')
        .where('todo.id = :id', { id })
        .getOne();
      return todo;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      this.logger.log('findAll');
      const response = await this.todoRepository.find();
      return response;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async create(body: CreateTodoDto) {
    try {
      const todo = new Todo(body.title, body.description);
      await this.todoRepository.save(todo);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async update(id: string, body: UpdateTodoDto): Promise<UpdateResult> {
    try {
      return await this.todoRepository
        .createQueryBuilder('todo')
        .update()
        .where('todo.id = :id', { id })
        .set(body)
        .execute();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.todoRepository
        .createQueryBuilder('todo')
        .delete()
        .where('todo.id = :id', { id })
        .execute();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
