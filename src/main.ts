import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS template example')
    .setDescription('The nestjs template example API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config: ConfigService = app.get(ConfigService);
  const port: number = +config.get<number>('APP_PORT');
  await app.listen(port);
};

bootstrap();
