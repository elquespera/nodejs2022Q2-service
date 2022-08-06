import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  log(message: any, ) {
    console.log('something');
  }

  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    // super.error(...arguments);
  }
}