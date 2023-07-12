import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({
  path: '.env',
});

/* This code exports a constant object named `Config` which contains various configuration options for
a TypeScript application. */
export const Config = {
  configModule: {
    options: {
      cache: false,
    },
  },
  app: {
    host: process.env.SERVER_HOST,
    port: +process.env.SERVER_PORT,
    PWD: process.env.PWD,
  },
  rabbitMq: {
    host: process.env.RABBITMQ_HOST,
    port: +process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
  },
};
