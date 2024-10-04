import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('emailAddress') emailAddress: string,
    @Body('password') password: string,
  ) {
    if (!emailAddress || !password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.login(emailAddress, password);
  }

  @Post('register')
  async register(
    @Body('emailAddress') emailAddress: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    if (!emailAddress || !password || !firstName || !lastName) {
      throw new BadRequestException(
        'Email, password, firstname, lastname are required',
      );
    }
    return this.authService.register(
      firstName,
      lastName,
      emailAddress,
      password,
    );
  }
}
