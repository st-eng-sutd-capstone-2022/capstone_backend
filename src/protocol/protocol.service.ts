import { Injectable } from '@nestjs/common';
import { MqttOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ProtocolService {
  getMQTTConfig(url: string): MqttOptions {
    return {
      transport: Transport.MQTT,
      options: {
        url,
      },
    };
  }
}
