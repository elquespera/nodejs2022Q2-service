import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {
    this.logger.setContext('Http');
  }

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.debug('Something');

    next();
  }
}