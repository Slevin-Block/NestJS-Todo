import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Status, (status) => status.users)
  @JoinColumn()
  status: Status;

  constructor(name: string, status: Status) {
    this.id = uuid();
    this.name = name;
    this.status = status;
  }
}

/**

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name TEXT,
  status_id UUID REFERENCES "status"(id)
);

*/
