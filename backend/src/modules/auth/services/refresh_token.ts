import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaTransactionService } from 'src/modules/data';
import { Token } from '../entities';
import { GenerateUserTokenService } from './generate_user_token';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly generateUserTokenService: GenerateUserTokenService,
    private readonly prismaTransactionService: PrismaTransactionService,
  ) { }

  async handle(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token.');
    }

    const token = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.token.findUnique({
      where: { refresh_token: refreshToken }
    }));

    if (!token) {
      throw new BadRequestException('Refresh token not found.');
    }

    const user = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.user.findUnique({
      where: { id: Token.fromPrisma(token).userId }
    }));

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.generateUserTokenService.handle({ ...user });
  }
}
