import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [ProtocolModule, AuthModule, StatusModule],
})
export class AppModule {}
