import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyCsrf from 'fastify-csrf';
import fastifyCookie from 'fastify-cookie';

import { AppModule } from './app.module';
import { ProtocolService } from './protocol/protocol.service';
import { MQTTAppModule } from './mqttApp.module';
import { ProtocolModule } from './protocol/protocol.module';
async function bootstrap() {
  // Spin up the important modules like mongoDB and Config Service
  const core = await NestFactory.create(ProtocolModule);

  if (process.env.MQTT !== 'true') {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      // Turn off logger during prod
      new FastifyAdapter({ logger: false }),
      {
        cors: true,
      },
    );

    // Add validation pipeline to all API
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    app.register(fastifyCookie);
    // Add csrf protection
    app.register(fastifyCsrf);

    // Swagger stuff
    const config = new DocumentBuilder()
      .setTitle('Capstone s36')
      .setDescription('The caps API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
        'ApiKeyAuth',
      )
      .addSecurityRequirements('ApiKeyAuth')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
      console.log(`🚀 connection is established at ${address}`, `Error ${err}`);
      console.log(`🚀 SWAGGER is online at ${address}/api`, `Error ${err}`);
    });
  }

  // ---------------------------
  // mqtt shits
  console.log(process.env.MQTT);
  if (process.env.MQTT === 'true') {
    const configService = core.get(ConfigService);
    const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      MQTTAppModule,
      new ProtocolService().getMQTTConfig(configService.get('MQTT_BROKER_URL')),
    );

    mqttApp.listen();
    console.log('🚀 MQTT service is started');
  }
}
bootstrap();
