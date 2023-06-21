import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { v4 as uuid } from 'uuid';
import { Todo } from './todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Status, (status) => status.users)
  @JoinColumn()
  status: Status;

  @ManyToMany(() => Todo, (todo) => todo?.users, { eager: true })
  @JoinTable({ name: 'planning' })
  todos?: Todo[];

  constructor(name: string, status: Status) {
    this.id = uuid();
    this.name = name;
    this.status = status;
  }

  initTodos() {
    this.todos = [];
  }
}

/**

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name TEXT,
  status_id UUID REFERENCES "status"(id)
);

*/
