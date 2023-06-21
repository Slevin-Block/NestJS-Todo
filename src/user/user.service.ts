import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { StatusService } from '../status/status.service';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  private readonly Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly statusService: StatusService,
  ) {}

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.status', 'status')
        .leftJoinAndSelect('user.todos', 'todos')
        .where('user.id = :id', { id })
        .getOne();
      return user;
    } catch (e) {
      this.Logger.error(e);
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      //const status = await this.statusService.findAll();
      //console.log(status);
      const response = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.status', 'status')
        .leftJoinAndSelect('user.todos', 'todos')
        .getMany();
      const users: IUser[] = response.map((user) => {
        return { ...user, status: user.status.label };
      });
      return users;
    } catch (e) {
      this.Logger.error(e);
    }
  }

  async create(body: CreateUserDto) {
    try {
      const status = await this.statusService.findOne('label', body.status);
      if (!status) throw this.Logger.error('Status not found');
      const user = new User(body.name, status);
      await this.userRepository.save(user);
    } catch (e) {
      this.Logger.error(e);
    }
  }
}
