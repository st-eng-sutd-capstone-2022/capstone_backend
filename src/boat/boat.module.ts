import { RawBoat, RawBoatSchema } from '@modules/raw-boat/raw-boat.schema';
import { Weight, WeightSchema } from '@modules/weight/weight.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RawBoat.name,
        schema: RawBoatSchema,
      },
      {
        name: Weight.name,
        schema: WeightSchema,
      },
    ]),
  ],
  providers: [BoatService],
  controllers: [BoatController],
})
export class BoatModule {}
