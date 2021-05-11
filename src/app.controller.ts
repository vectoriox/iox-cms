import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.gouard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private _authService: AuthService) {}

  @Get()
  getHello() {
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }
}
