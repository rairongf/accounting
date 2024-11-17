import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayloadDto, UserPayload } from 'src/modules/common';
import { getConfiguration } from 'src/modules/config/configuration';

const { jwt } = getConfiguration();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  async validate({ sub, email }: AccessTokenPayloadDto): Promise<UserPayload> {
    /* const user = undefined;

    if (!user) {
      throw new ForbiddenException('Usuário não tem acesso à esse recurso.');
    } */

    return { userId: parseInt(sub, 10), email };
  }
}
