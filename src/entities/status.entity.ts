import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  label: string;

  @OneToMany(() => User, (user) => user.status, { eager: true })
  users: User[];
}

export enum UserStatus {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}
/**
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label VARCHAR(100) NOT NULL
);

INSERT INTO status (label) VALUES
      ('admin'),
      ('moderator'),
      ('user');

*/
