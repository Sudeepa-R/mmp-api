import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
