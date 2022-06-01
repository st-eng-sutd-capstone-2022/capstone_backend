import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { ProtocolService } from './protocol.service';

export const PROTOCOL_SERVICE_TOKEN = {
  MQTT: 'MQTT_SERVICE',
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
