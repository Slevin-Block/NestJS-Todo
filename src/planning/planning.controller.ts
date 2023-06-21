import {
  Body,
  Controller,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/planning.dto';

@Controller('planning')
export class PlanningController {
  private readonly logger = new Logger(PlanningController.name);
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  async create(@Body() body: CreatePlanningDto) {
    this.planningService.create(body);
  }
}
