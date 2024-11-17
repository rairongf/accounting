import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { add, getUnixTime } from 'date-fns';
import { PrismaTransactionService } from 'src/modules/data';
import { Token } from '../entities';

type UserEmailAndId = { email: string; id: number; };

@Injectable()
export class GenerateUserTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaTransactionService: PrismaTransactionService,
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
    const oldToken = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.token.findUnique({
      where: {
        user_id: user.id,
      }
    }));

    if (!oldToken) {
      const token = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.token.create({
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          user: { connect: { id: user.id } }
        }
      }));
      if (!token) {
        console.log('Missing old token. Could not create new token.');
        throw new UnauthorizedException('Invalid credentials');
      }
      return Token.fromPrisma(token);
    }

    const token = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.token.update({
      where: { id: Token.fromPrisma(oldToken).id },
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      }
    }));

    if (!token) {
      console.log('Could not update old token.');
      throw new UnauthorizedException('Invalid credentials');
    }

    return Token.fromPrisma(token);
  }
}
