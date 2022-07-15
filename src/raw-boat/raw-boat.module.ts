import { Location, LocationSchema } from '@modules/location/location.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RawBoatController } from './raw-boat.controller';
import { RawBoat, RawBoatSchema } from './raw-boat.schema';
import { RawBoatService } from './raw-boat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RawBoat.name,
        schema: RawBoatSchema,
      },
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
  ],
  providers: [RawBoatService],
  controllers: [RawBoatController],
  exports: [RawBoatService],
})
export class RawBoatModule {}
