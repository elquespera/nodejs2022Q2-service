import { ConsoleLogger, Injectable } from '@nestjs/common';

enum LoggingLevels {
  LOG,
  ERROR,
  WARN,
  DEBUG,
  VERBOSE,
}

@Injectable()
export class LoggingService extends ConsoleLogger {
  private loggingLevel = process.env.LOGGING_LEVEL || 4;

  log(message: any, context?: string) {
    if (this.loggingLevel >= LoggingLevels.LOG)
      super.log(message);
  }

  error(message: any, context?: string) {
    if (this.loggingLevel >= LoggingLevels.ERROR)
      super.error(message);
  }

  warn(message: any, context?: string) {
    if (this.loggingLevel >= LoggingLevels.WARN)
      super.warn(message);
  }

  debug(message: any, context?: string) {
    if (this.loggingLevel >= LoggingLevels.DEBUG)
      super.debug(message);
  }

  verbose(message: any, context?: string) {
    if (this.loggingLevel >= LoggingLevels.VERBOSE)
      super.verbose(message);
  }
}