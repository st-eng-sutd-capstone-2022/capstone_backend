import { Module } from '@nestjs/common';

import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ProtocolModule, StatusModule],
})
export class MQTTAppModule {}
