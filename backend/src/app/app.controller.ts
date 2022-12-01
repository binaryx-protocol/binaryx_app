import { Controller, Request, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate(@Request() req) {
    return req.user;
  }
}
