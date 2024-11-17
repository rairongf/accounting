import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { GenerateUserTokenService, ValidateUserService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private generateUserTokenService: GenerateUserTokenService,
    private validateUserService: ValidateUserService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.validateUserService.handle(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.generateUserTokenService.handle({
      id: user.id,
      email: user.email,
    });
  }
}
