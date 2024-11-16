import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { add, getUnixTime } from 'date-fns';

type UserEmailAndId = { email: string; id: string; };
type Token = {};

@Injectable()
export class GenerateUserTokenService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async handle(user: UserEmailAndId) {
    const refreshTokenExpiresAt = add(new Date(), { hours: 24 });
    const accessTokenExpiresAt = add(new Date(), { hours: 1 });

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: getUnixTime(accessTokenExpiresAt) },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: getUnixTime(refreshTokenExpiresAt) },
    );

    // save or update token locally
    await this.saveToken(user, accessToken, refreshToken);
    return {
      refreshTokenExpiresAt,
      accessTokenExpiresAt,
      accessToken,
      refreshToken,
    };
  }

  private async saveToken(
    user: UserEmailAndId,
    accessToken: string,
    refreshToken: string,
  ): Promise<Token> {
    const oldToken: Token = {};

    if (!oldToken) {
      const token: Token = {};
      return token;
    }

    const token: Token = {};

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return token;
  }
}
