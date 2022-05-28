import { Injectable } from '@nestjs/common';
import { MqttOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ConfigService {
  getMQTTConfig(): MqttOptions {
    return {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://broker.hivemq.com:1883',
      },
    };
  }
}
