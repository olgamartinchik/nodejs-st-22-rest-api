import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.useGlobalPipes(new ValidationPipe({ 
    transform:true,
    whitelist: true,
    forbidNonWhitelisted: true
    }));
>>>>>>> 40bb2c4 (fix: fix methods)
  await app.listen(3000);
}
bootstrap();
