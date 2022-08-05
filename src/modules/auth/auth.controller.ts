import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
    
} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.signup(userDto);
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.authService.login(userDto);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  @Public()
  @Post('/refresh')
  @HttpCode(200)
  refresh( ) {

  }  
}
