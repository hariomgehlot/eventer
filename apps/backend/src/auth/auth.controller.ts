import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  onLogin(@Body() authBody: { mobile: string; password: string }) {
    return this.authService.onLogin(authBody.mobile, authBody.password);
  }
  @Post('signup')
  onSignUp(@Body() authBody: { mobile: string; password: string }) {
    return this.authService.onSignUp(authBody.mobile, authBody.password);
  }
}
