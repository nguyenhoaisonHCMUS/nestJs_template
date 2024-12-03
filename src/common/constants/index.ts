import * as dotenv from 'dotenv';
dotenv.config();
// App Configs

export const AppConfig = {
  PORT: process.env.PORT || 5000,
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY || 'ACCESS_SECRETkey',
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY || 'REFRESH_SECRETkey',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 3600,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION) : 604800,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// DB Configs
export const DbConfig = {
  DB_PORT: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',
};

// AWS Configs
export const AwsConfig = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_S3_REGION: process.env.AWS_S3_REGION || '',
  AWS_DEFAULT_S3_BUCKET: process.env.AWS_DEFAULT_S3_BUCKET || '',
};