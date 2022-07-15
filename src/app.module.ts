import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';
import { BoatModule } from './boat/boat.module';
import { LocationModule } from './location/location.module';
import { AssignModule } from './assign/assign.module';
import { WeightModule } from './weight/weight.module';

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

  imports: [
    ProtocolModule,
    AuthModule,
    StatusModule,
    BoatModule,
    LocationModule,
    AssignModule,
    WeightModule,
  ],
})
export class AppModule {}
