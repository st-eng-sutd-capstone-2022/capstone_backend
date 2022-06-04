import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

const REQUIRED_ENVS = {
  MONGODB_URL: 'MONGODB_URL',
  MQTT_BROKER_URL: 'MQTT_BROKER_URL',
  JWT_SECRET: 'JWT_SECRET',
};

const envValidation = (vars: Record<string, any>): Record<string, any> => {
  console.log('Env variables\n------------');
  if (
    Object.keys(REQUIRED_ENVS).some((env) => {
      const val = vars[env];

      console.log(`${env}: ${val}`);
      return typeof val === 'undefined';
    })
  )
    throw Error('Env variables are not valid');
  console.log('------------\n');

  return vars;
};

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
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
    }),
    ProtocolModule,
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
