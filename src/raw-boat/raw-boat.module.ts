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
    ]),
  ],
  providers: [RawBoatService],
  controllers: [RawBoatController],
})
export class RawBoatModule {}
