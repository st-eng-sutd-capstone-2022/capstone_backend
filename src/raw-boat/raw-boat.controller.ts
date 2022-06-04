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
    const id = context.getTopic().split('/')[1];

    this.rawBoatService.addOne({
      boatId: id,
      latitude: data.latitude,
      longtitude: data.longtitude,
      batteryLevel: data.batteryLevel,
      timestamp: data.timestamp,
    });
    console.log(
      `ping: ${
        Date.now() - (data.timestamp as unknown as number)
      }ms | boatId: ${id} | Data ${JSON.stringify(data)}`,
    );
  }
}
