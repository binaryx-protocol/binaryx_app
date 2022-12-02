import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // console.log('process.env', process.env);
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
