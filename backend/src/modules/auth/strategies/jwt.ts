import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayloadDto, UserPayload } from 'src/modules/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate({ sub, email }: AccessTokenPayloadDto): Promise<UserPayload> {
    const user = undefined;

    if (!user) {
      throw new ForbiddenException('Usuário não tem acesso à esse recurso.');
    }

    return { userId: 'id', email };
  }
}
