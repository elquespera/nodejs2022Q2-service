import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {
    this.logger.setContext('Http');
  }

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, params, body } = request;

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      this.logger.log(`${method} ${originalUrl} Status: ${statusCode} ${statusMessage}`);
      if (Object.keys(params).length > 0) {
        this.logger.verbose(`Request params: ${JSON.stringify(params)}`);
      }
      if (Object.keys(body).length > 0) {
        this.logger.verbose(`Request body: ${JSON.stringify(body)}`);
      }
    });

    next();
  }
}