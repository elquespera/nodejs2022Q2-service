import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {
    this.logger.setContext('Error');
  }
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    await this.logger.error(`${exception.name}: ${status} ${exception.message}`);
    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toLocaleString(),
        path: request.url,
      });
  }
}