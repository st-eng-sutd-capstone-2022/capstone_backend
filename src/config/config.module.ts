import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ConfigService } from './config.service';

export const CONFIG_SERVICE_TOKEN = {
  MQTT: 'MQTT_SERVICE',
};

const mqttSerivce = {
  provide: CONFIG_SERVICE_TOKEN.MQTT,
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create(configService.getMQTTConfig()),
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [mqttSerivce, ConfigService],
  exports: [mqttSerivce],
})
export class ConfigModule {}
