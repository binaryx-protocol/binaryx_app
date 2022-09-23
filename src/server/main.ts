import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());

  console.log('process.env', process.env);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
