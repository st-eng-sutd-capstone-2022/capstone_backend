import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
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

  await app.listen(3000, '0.0.0.0');

  // ---------------------------
  // mqtt shits

  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    MQTTAppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:6379',
      },
    },
  );

  mqttApp.listen();
}
bootstrap();
