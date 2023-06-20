import { Controller, Get, Logger, Query } from '@nestjs/common';
import { IStatus } from './status.interface';
import { StatusService } from './status.service';
import { ApiQuery } from '@nestjs/swagger';
import { Status, UserStatus } from 'src/entities/status.entity';

@Controller('status')
export class StatusController {
  private readonly logger = new Logger(StatusService.name);
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    description: 'status uuid string',
    schema: { type: 'string' },
    required: false,
  })
  @ApiQuery({ name: 'label', enum: UserStatus, required: false })
  async getStatus(@Query() query): Promise<Status | Status[]> {
    if (Object.keys(query).length === 0) {
      return this.statusService.findAll();
    } else {
      this.logger.log(`Query: ${JSON.stringify(query)}`);
      if (Object.keys(query).length > 1) {
        this.logger.error('Bad request: too many or wrong parameters');
      } else if (query.hasOwnProperty('id')) {
        return this.statusService.findOne('id', query.id);
      } else if (query.hasOwnProperty('label')) {
        return this.statusService.findOne('label', query.label);
      } else {
        this.logger.error('Bad request: wrong parameter');
      }
    }
  }
}
