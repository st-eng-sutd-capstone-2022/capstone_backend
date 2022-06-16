import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationController } from './location.controller';

@Module({
    // imports: []
      //   MongooseModule.forFeature([
      //     {
      //       name: Location.name,
      //       schema: LocationSchema,
      //     },
      //   ]),
      // ],
      controllers: [LocationController],
})
export class LocationModule {}
