import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ProtocolModule,
    StatusModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
