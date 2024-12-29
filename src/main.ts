import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: ['http://localhost:5173', 'https://prod-mmp-api.vercel.app/'],
    credentials: true,
  });

  ConfigModule.forRoot({
    isGlobal: true,
  });

  const options = new DocumentBuilder()
    .setTitle('MMP API')
    .setDescription('The API description')
    .setVersion('0.0.1')
    .addTag('')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { docException: 'none' },
  });
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { docException: 'none', tagsSorter: 'alpha' },
  });

  await app.init(); // Initialize the application
}

bootstrap();

// Export the server for Vercel
export default server;
