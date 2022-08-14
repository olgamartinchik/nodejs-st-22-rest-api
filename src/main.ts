
import { ValidationPipe,Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  process.on('uncaughtException', (err, origin) => {
    console.error('uncaughtException:',   `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`);
  });
process.on('unhandledRejection', (reason, promise)=>{
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
})


  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT);

  

}
bootstrap();
