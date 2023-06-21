import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { UpdateTodoDto } from 'src/todo/dto/todo.dto';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', length: 100 })
  private title: string;

  @Column({ type: 'text' })
  private description: string;

  @Column({ type: 'boolean' })
  private done: boolean;

  @ManyToMany(() => User, (user) => user?.todos)
  users?: User[];

  constructor(title: string, description: string) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.done = false;
  }

  initUsers() {
    this.users = [];
  }

  switch() {
    console.log('Before : ', this.done);
    this.done = !this.done;
    console.log('After : ', this.done);
  }

  update(newValues: UpdateTodoDto) {
    if (newValues.hasOwnProperty('done')) this.done = newValues.done;
    if (!!newValues.title) this.title = newValues.title;
    if (!!newValues.description) this.description = newValues.description;
  }
}
