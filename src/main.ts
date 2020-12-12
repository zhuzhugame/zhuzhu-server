import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './module/app.module';
import { loadSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  loadSwagger(app);
  await app.listen(3000, '0.0.0.0');
  Logger.log(`Listening at http://localhost:${3000}/`);
}
bootstrap();
