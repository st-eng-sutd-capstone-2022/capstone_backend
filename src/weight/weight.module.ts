import { AssignModule } from '@modules/assign/assign.module';
import { RawBoatModule } from '@modules/raw-boat/raw-boat.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeightController } from './weight.controller';
import { Weight, WeightSchema } from './weight.schema';
import { WeightService } from './weight.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Weight.name,
        schema: WeightSchema,
      },
    ]),
    RawBoatModule,
    AssignModule,
  ],
  controllers: [WeightController],
  providers: [WeightService],
  exports: [WeightService],
})
export class WeightModule {}
