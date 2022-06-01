import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';

const REQUIRED_ENVS = {
  MONGODB_URL: 'MONGODB_URL',
  MQTT_BROKER_URL: 'MQTT_BROKER_URL',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (vars) => {
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
      },
    }),
    ProtocolModule,
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
