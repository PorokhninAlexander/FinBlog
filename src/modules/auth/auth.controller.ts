import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return this._authService.login(data);
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this._authService.register(data);
  }
}
