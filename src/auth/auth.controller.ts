import { Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req): Promise<any> {
    return this.authService.getMe(req.user.id);
  }
}
