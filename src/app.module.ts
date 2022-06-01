import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProtocolModule,
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
