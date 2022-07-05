import { Module } from '@nestjs/common';

import { BoatController } from './boat.controller';
import { BoatService } from './boat.service';

@Module({
  providers: [BoatService],
  controllers: [BoatController],
})
export class BoatModule {}
