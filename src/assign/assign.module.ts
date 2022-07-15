import { WeightController } from '@modules/weight/weight.controller';
import { Weight, WeightSchema } from '@modules/weight/weight.schema';
import { WeightService } from '@modules/weight/weight.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignController } from './assign.controller';
import { Assign, AssignSchema } from './assign.schema';
import { AssignService } from './assign.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Assign.name,
        schema: AssignSchema,
      },
      {
        name: Weight.name,
        schema: WeightSchema,
      },
    ]),
  ],
  controllers: [AssignController],
  providers: [AssignService, WeightService],
  exports: [AssignService],
})
export class AssignModule {}
