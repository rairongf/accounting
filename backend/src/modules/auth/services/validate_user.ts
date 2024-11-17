import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaTransactionService } from 'src/modules/data';
import { User } from '../entities';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly prismaTransactionService: PrismaTransactionService,) { }

  async handle(
    email: string,
    password: string,
  ): Promise<User> {
    const userData = await this.prismaTransactionService.handle<any>(async (prisma) => prisma.user.findUnique({
      where: { email: email }
    }));

    if (!userData) {
      console.log('Could not find user');
      throw new UnauthorizedException();
    }

    const user = User.fromPrisma(userData);

    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      //const { password, ...result } = user;
      return user;
    }

    console.log('Passwords did not match');
    throw new UnauthorizedException();
  }
}
