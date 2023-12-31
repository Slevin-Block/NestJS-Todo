import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from '../request.service';

@Injectable()
export class AuthentifiactionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthentifiactionMiddleware.name);

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Authenticate the request
    const userId = '123';
    this.requestService.setUserId(userId);
    this.logger.log(`User ${userId} authenticated`);
    next();
  }
}
