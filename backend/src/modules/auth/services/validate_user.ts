import { Injectable, UnauthorizedException } from '@nestjs/common';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserService {
  constructor() { }

  async handle(
    email: string,
    password: string,
  ): Promise<{ email: string; id: string; }> {
    let user: { email: string; id: string; password: string; } | undefined = undefined;

    if (!user) {
      console.log('Could not find user');
      throw new UnauthorizedException();
    }

    /* if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result };
    } */

    console.log('Passwords did not match');
    throw new UnauthorizedException();
  }
}
