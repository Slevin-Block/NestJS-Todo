import { Status } from 'src/entities/status.entity';

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}
