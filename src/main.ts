import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // NestFactory is the entry point of Nest application.
  const app = await NestFactory.create(AppModule);

  // ValidationPipe is a pipe that uses class-validator to automatically validate incoming requests.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Port definition and listening.
  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
}
bootstrap();
