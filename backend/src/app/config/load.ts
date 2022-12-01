import { LogLevel } from '@nestjs/common';
import { ConfigMode, IConfig } from '../../common/types/config';

export const loadEnv = (): IConfig => {
  return {
    mode: process.env.NODE_ENV as ConfigMode,
    log: {
      level: process.env.LOG_LEVEL as LogLevel,
    },
    server: {
      protocol: process.env.SERVER_PROTOCOL,
      host: process.env.SERVER_HOST,
      port: Number(process.env.SERVER_PORT),
      baseurl: process.env.SERVER_BASE_PATH,
    },
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      name: process.env.DB_NAME,
      dialect: process.env.DB_DIALECT,
      schema: process.env.DB_SCHEMA,
    },
    auth: {
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      oauth: {
        google: {
          id: process.env.OAUTH_GOOGLE_ID,
          secret: process.env.OAUTH_GOOGLE_SECRET,
          redirectUrl: process.env.OAUTH_GOOGLE_REDIRECT_URL,
        },
        cognito: {
          id: process.env.OAUTH_COGNITO_ID,
          secret: process.env.OAUTH_COGNITO_SECRET,
          redirectUrl: process.env.OAUTH_COGNITO_REDIRECT_URL,
          domain: process.env.OAUTH_COGNITO_DOMAIN,
          region: process.env.OAUTH_COGNITO_REGION,
        },
      },
    },
  };
};

export const loadAll = async () => {
  return loadEnv();
};
