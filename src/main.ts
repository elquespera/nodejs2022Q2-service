import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SwaggerModule } from '@nestjs/swagger';
import { parse as parseYaml } from 'yaml';
import { resolve } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const apiDocFile = await readFile(
      resolve(__dirname, '..', 'doc', 'api.yaml'),
      'utf-8',
    );
    const apiDoc = parseYaml(apiDocFile);
    SwaggerModule.setup('doc', app, apiDoc);
  } catch (error) {
     console.error(error);
  }

  app.useGlobalPipes( 
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Server has started on http://localhost:${port}`);
}

bootstrap();
