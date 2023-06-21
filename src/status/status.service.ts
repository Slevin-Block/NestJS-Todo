import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/entities/status.entity';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    try {
      const response = await this.statusRepository.find();
      return response;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findOne(type: 'id' | 'label', payload: string): Promise<Status> {
    try {
      const response = await this.statusRepository
        .createQueryBuilder('status')
        .where(`status.${type} = :payload`, { payload });
      return response.getOne();
    } catch (e) {
      this.logger.error('erreur' + e);
    }
  }
}
