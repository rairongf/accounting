import { Injectable } from '@nestjs/common';
import { GenerateUserTokenService } from './generate_user_token';

@Injectable()
export class LoginService {
  constructor(
    private readonly generateUserTokenService: GenerateUserTokenService,
  ) { }

  async handle(user: { id: number; email: string }) {
    const token = await this.generateUserTokenService.handle({
      id: user.id,
      email: user.email,
    });
    return token;
  }
}
