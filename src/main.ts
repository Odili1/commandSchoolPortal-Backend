import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
// import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await CommandFactory.run(AppModule, ['warn', 'error'])
  app.enableCors()
  app.use(cookieParser())


  await app.listen(4850);
}
bootstrap();
