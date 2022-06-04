import { Module } from '@nestjs/common';

import { ProtocolModule } from './protocol/protocol.module';
import { RawBoatModule } from './raw-boat/raw-boat.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ProtocolModule, StatusModule, RawBoatModule],
})
export class MQTTAppModule {}
