import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateUserTokenService } from './generate_user_token';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly generateUserTokenService: GenerateUserTokenService,
  ) { }

  async handle(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new BadRequestException('Refresh token inválido');
    }

    const token = undefined;

    if (!token) {
      throw new BadRequestException('Refresh token não encontrado');
    }

    /* const accessToken = this.jwtService.decode<AccessTokenPayload>(
      token.accessToken,
    ); */

    const user: { email: string; id: string; } | undefined = undefined;

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    //return await this.generateUserTokenService.handle({ ...user });
  }
}
