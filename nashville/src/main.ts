import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from '@common/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from '@common/exception';
import { RedisIoAdapter } from '@common/adapters/redisIOAdapter.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* The `await app.startAllMicroservices();` line of code is starting all the microservices that have
  been connected to the NestJS application. This is necessary to establish communication between the
  microservices and the main application. Once the microservices are started, they can send and
  receive messages or perform other tasks as defined in their respective implementations. */
  await app.startAllMicroservices();

  /* The code is creating a new instance of the `RedisIoAdapter` class and passing the `app` object as
  a parameter to the constructor. Then, it calls the `connectToRedis()` method on the
  `redisIoAdapter` instance to establish a connection to Redis. Finally, it sets the WebSocket
  adapter of the NestJS application to be the `redisIoAdapter` instance using the
  `app.useWebSocketAdapter()` method. This allows the application to use Redis as the WebSocket
  adapter, enabling real-time communication through WebSockets. */
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  /* `app.enableCors()` is enabling Cross-Origin Resource Sharing (CORS) for the NestJS application.
  CORS is a security feature implemented by web browsers that restricts web pages from making
  requests to a different domain than the one that served the web page. By enabling CORS, the NestJS
  application is allowing requests from any origin to access its resources. The `origin: '*'` option
  specifies that any origin is allowed to access the resources. This is useful when developing and
  testing the application, but in production, it is recommended to specify the allowed origins
  explicitly for security reasons. */
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter());

  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));

  /* This code is creating a Swagger documentation configuration object using the `DocumentBuilder`
  class provided by the `@nestjs/swagger` package. It sets the title, description, version, and tag
  of the documentation, and also adds a bearer authentication option. The `build()` method is then
  called to generate the final configuration object. This object is later used to generate and set
  up Swagger documentation for the NestJS application. */
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('BFF')
    .setDescription('BFF Rest Api')
    .setVersion('1.0')
    .addTag('BFF')
    .build();

  /* `app.enableVersioning()` enables versioning for the NestJS application. This means that the
  application can handle multiple versions of the same API. It allows developers to make changes to
  the API without breaking existing clients that rely on the previous version. The versioning type
  can be specified as an argument, and in this case, it is not specified, so it defaults to
  `VersioningType.URI`. This means that the version is specified in the URI of the request, for
  example, `/v1/users`. */
  app.enableVersioning();

  /* This code is generating and setting up Swagger documentation for the NestJS application. */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.app.port);
}
bootstrap();
