import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from '../common';
import { LocalAuthGuard } from './guards';
import { LoginService, RefreshTokenService } from './services';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.user;
  }

  @Post('token/refresh')
  async refreshToken(@Body() data: { refreshToken: string }) {
    return await this.refreshTokenService.handle(data.refreshToken);
  }
}
