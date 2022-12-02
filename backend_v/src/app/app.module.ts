import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigMode, IConfig, IDatabaseConfig } from '../common/types/config';
import { AppConfigModule } from './config/config.module';
import { SeedService } from '../console/seed.service';
import { ConsoleModule } from 'nestjs-console';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<IConfig>) => {
        const dbConfig = config.get<IDatabaseConfig>('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          autoLoadEntities: true,
          ssl:
            config.get<ConfigMode>('mode') === 'production'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
    }),
    ConsoleModule,
    AuthModule,
    UsersModule,
    AssetsModule,
    OrdersModule,
  ],
  providers: [SeedService],
  controllers: [AppController],
})
export class AppModule {}
