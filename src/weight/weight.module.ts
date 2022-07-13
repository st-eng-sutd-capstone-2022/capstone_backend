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
  ],
  controllers: [WeightController],
  providers: [WeightService],
})
export class WeightModule {}
