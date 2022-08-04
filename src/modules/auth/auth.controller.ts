import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.signup(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.login(userDto);
  }
}
