import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { ProtocolService } from './protocol.service';

export const PROTOCOL_SERVICE_TOKEN = {
  MQTT: 'MQTT_SERVICE',
};

const REQUIRED_ENVS = {
  NODE_ENV: 'NODE_ENV',
  MONGODB_URL: 'MONGODB_URL',
  MQTT_BROKER_URL: 'MQTT_BROKER_URL',
  JWT_SECRET: 'JWT_SECRET',
};

const envValidation = (vars: Record<string, any>): Record<string, any> => {
  console.log('Env variables\n------------');

  if (
    Object.keys(REQUIRED_ENVS).some((env) => {
      const val = vars[env];

      console.log(`${env}: ${val}`);
      return typeof val === 'undefined';
    })
  )
    throw Error('Env variables are not valid 123');
  console.log('------------\n');

  return vars;
};

const mqttSerivce = {
  provide: PROTOCOL_SERVICE_TOKEN.MQTT,
  useFactory: (
    protocolService: ProtocolService,
    configService: ConfigService,
  ) =>
    ClientProxyFactory.create(
      protocolService.getMQTTConfig(configService.get('MQTT_BROKER_URL')),
    ),
  inject: [ProtocolService, ConfigService],
};

const modules = [
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    validate: envValidation,
    envFilePath: (() => {
      const NODE_ENV = process.env.NODE_ENV;

      switch (NODE_ENV) {
        case 'dev':
          return '.env.dev';

        case 'docker':
          return '.env.docker';

        default:
          return '.env';
      }
    })(),
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get('MONGODB_URL');

      console.log(`🥭 connecting to MongoDB. Link: ${uri}`);
      return {
        uri,
      };
    },
    inject: [ConfigService],
  }),
];

@Global()
@Module({
  imports: [...modules],
  providers: [mqttSerivce, ProtocolService, ConfigService],
  exports: [mqttSerivce, ...modules],
})
export class ProtocolModule {}
