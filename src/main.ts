import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse as parseYaml } from 'yaml';
import { resolve as resolvePath, dirname } from 'path';

import 'dotenv/config';
import 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocFile = await readFile(
    resolvePath('..', dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const apiDoc = parseYaml(apiDocFile);
  SwaggerModule.setup('doc', app, apiDoc);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(port);
  console.log(`Server has started on http://localhost:${port}`);
}
bootstrap();
