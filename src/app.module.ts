import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwtAuth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

const REQUIRED_ENVS = {
  NODE_ENV: 'NODE_ENV',
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
    throw Error('Env variables are not valid 123');
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
      cache: true,
      isGlobal: true,
      validate: envValidation,
      envFilePath: (() => {
        const NODE_ENV = process.env.NODE_ENV;

        switch (NODE_ENV) {
          case 'dev':
            return '.env.dev';

          case 'docker':
            return '.env.docker';

          default:
            return '.env';
        }
      })(),
    }),
    ProtocolModule,
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
