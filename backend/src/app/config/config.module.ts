import { envValidationSchema } from './schemas';
import { loadAll } from './load';
import { ConfigModule } from '@nestjs/config';

export const AppConfigModule = ConfigModule.forRoot({
  envFilePath: ['.env', '.env.ci'],
  isGlobal: true,
  validationSchema: envValidationSchema(),
  load: [loadAll],
});
