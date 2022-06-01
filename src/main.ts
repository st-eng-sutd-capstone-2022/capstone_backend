import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ProtocolService } from './protocol/protocol.service';
import { MQTTAppModule } from './mqttApp.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // Turn off logger during prod
    new FastifyAdapter({ logger: true }),
  );

  // Swagger stuff
  const config = new DocumentBuilder()
    .setTitle('Capstone s36')
    .setDescription('The caps API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.listen(3000, '0.0.0.0', (err, address) => {
    console.log(`connection is established at ${address}`, err);
  });

  // ---------------------------
  // mqtt shits
  const configService = app.get(ConfigService);
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    MQTTAppModule,
    new ProtocolService().getMQTTConfig(configService.get('MQTT_BROKER_URL')),
  );

  mqttApp.listen();
}
bootstrap();
