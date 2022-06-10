import { Module } from '@nestjs/common';

import { AssignController } from './assign.controller';

@Module({
  // imports: [
  //     MongooseModule.forFeature([
  //       {
  //         name: Location.name,
  //         schema: AssignSchema,
  //       },
  //     ]),
  //   ],
  controllers: [AssignController],
})
export class AssignModule {}
