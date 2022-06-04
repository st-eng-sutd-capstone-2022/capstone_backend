import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('JWT_SECRET'));
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
