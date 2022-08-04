import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto } from '../../user/user.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.loginService.login(userDto);
  }
}
