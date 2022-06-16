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
    ]),
  ],
  controllers: [AssignController],
  providers: [AssignService],
})
export class AssignModule {}
