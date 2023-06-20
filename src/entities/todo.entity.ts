import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  private readonly id: string;

  @Column({ type: 'varchar', length: 100 })
  private readonly title: string;

  @Column({ type: 'text' })
  private readonly description: string;

  constructor(title: string, description: string) {
    this.id = uuid();
    this.title = title;
    this.description = description;
  }
}
