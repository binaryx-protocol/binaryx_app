import * as Joi from '@hapi/joi';

export const envValidationSchema = () => {
  return Joi.object({
    // MODE
    MODE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
    LOG_LEVEL: Joi.string()
      .valid('error', 'warn', 'info', 'verbose', 'debug', 'silly')
      .default('info'),
    // SERVER
    SERVER_PROTOCOL: Joi.string().default('http'),
    SERVER_HOST: Joi.string().default('localhost'),
    SERVER_PORT: Joi.string().default('3030'),
    SERVER_BASE_PATH: Joi.string().default('api/v1'),
    // DB
    DB_HOST: Joi.string().default('localhost'),
    DB_NAME: Joi.string().default('postgres'),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().default('postgres'),
    DB_PASSWORD: Joi.string().default('password'),

    // AUTH
    JWT_SECRET: Joi.string().default('secret'),
    JWT_EXPIRES_IN: Joi.string().default('10d'),
    OAUTH_GOOGLE_ID: Joi.string().default('id'),
    OAUTH_GOOGLE_SECRET: Joi.string().default('secret'),
    OAUTH_GOOGLE_REDIRECT_URL: Joi.string().default(
      'http://localhost:3030/auth/google/redirect',
    ),
    OAUTH_COGNITO_ID: Joi.string().default('id'),
    OAUTH_COGNITO_SECRET: Joi.string().default('secret'),
    OAUTH_COGNITO_REDIRECT_URL: Joi.string().default(
      'http://localhost:3030/auth/cognito/redirect',
    ),
    OAUTH_COGNITO_DOMAIN: Joi.string().default('nestjs-playground-dev'),
    OAUTH_COGNITO_REGION: Joi.string().default('us-east-1'),
  });
};
