import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices';

import { RawBoat } from './raw-boat.schema';
import { RawBoatService } from './raw-boat.service';

@Controller()
export class RawBoatController {
  constructor(private readonly rawBoatService: RawBoatService) {}

  @EventPattern('telemetry_s36/+')
  receiveRawTelemetry(
    @Payload() data: RawBoat,
    @Ctx() context: MqttContext,
  ): void {
    const boatId = context.getTopic().split('/')[1];

    if (!boatId) throw Error('invalid boatid');

    this.rawBoatService.addOne({
      boatId,
      latitude: data.latitude,
      longtitude: data.longtitude,
      batteryLevel: data.batteryLevel,
      timestamp: data.timestamp,
      mechanism_on: data.mechanism_on,
      motor_on: data.motor_on,
    });
    console.log(
      `ping: ${
        Date.now() - (data.timestamp as unknown as number)
      }ms | boatId: ${boatId} | Data ${JSON.stringify(data)}`,
    );
  }
}
