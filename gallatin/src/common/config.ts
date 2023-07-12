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
    microserviceGrpcPort: +process.env.SERVER_CONSTANTS_MICROSERVICE_GRPC_PORT,
    PWD: process.env.PWD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
  },
};
