import { LogLevel } from '@nestjs/common';

export enum ConfigMode {
  production = 'production',
  development = 'development',
  test = 'test',
}

export interface IServerConfig {
  protocol: string;
  host: string;
  port: number;
  baseurl: string;
}
export interface IDatabaseConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  name: string;
  dialect: string;
  schema: string;
}

export interface IConfig {
  mode: ConfigMode;
  log: {
    level: LogLevel;
  };
  server: IServerConfig;
  database: IDatabaseConfig;
  auth: {
    jwt: {
      secret: string;
      expiresIn: string;
    };
    oauth: {
      google: {
        id: string;
        secret: string;
        redirectUrl: string;
      };
      cognito: {
        id: string;
        secret: string;
        redirectUrl: string;
        domain: string;
        region: string;
      };
    };
  };
}
