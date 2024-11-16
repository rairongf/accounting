import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getConfiguration } from '../config/configuration';
import { AuthController } from './controller';
import {
  GenerateUserTokenService,
  LoginService,
  RefreshTokenService,
  ValidateUserService,
} from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

const { jwt } = getConfiguration();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: `${jwt.accessTokenExpiresIn}s`, algorithm: 'HS256' },
    }),
  ],
  providers: [
    GenerateUserTokenService,
    LoginService,
    RefreshTokenService,
    ValidateUserService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule { }
