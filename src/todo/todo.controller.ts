import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    await this.todoService.create(body);
  }

  @Patch('/switch/:id')
  async switch(@Param('id', ParseUUIDPipe) id: string) {
    if (!(await this.todoService.switch(id))) {
      throw new NotFoundException();
    }
  }
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    if (!(await this.todoService.update(id, body))) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.todoService.delete(id);
    if (result.affected !== 1) throw new NotFoundException();
  }
}
