import { Module } from '@nestjs/common';

import { BoatController } from './boat.controller';

@Module({
  controllers: [BoatController],
})
export class BoatModule {}
