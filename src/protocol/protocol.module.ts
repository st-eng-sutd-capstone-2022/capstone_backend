import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

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

@Global()
@Module({
  providers: [mqttSerivce, ProtocolService, ConfigService],
  exports: [mqttSerivce],
})
export class ProtocolModule {}
