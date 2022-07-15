import { AssignModule } from '@modules/assign/assign.module';
import { RawBoatModule } from '@modules/raw-boat/raw-boat.module';
import { WeightModule } from '@modules/weight/weight.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LocationController } from './location.controller';
import { Location, LocationSchema } from './location.schema';
import { LocationService } from './location.service';

@Module({
  providers: [LocationService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema,
      },
    ]),
    AssignModule,
    WeightModule,
    RawBoatModule,
  ],
  controllers: [LocationController],
})
export class LocationModule {}
