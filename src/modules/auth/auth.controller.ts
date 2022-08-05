import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
    
} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { JwtTokens, UpdateRefreshTokenDto } from './auth.types';
import { Public } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() userDto: CreateUserDto): Promise<JwtTokens> {
    return await this.authService.signup(userDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto): Promise<JwtTokens> {
    return await this.authService.login(userDto);
  }


  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() dto: UpdateRefreshTokenDto): Promise<JwtTokens> {
    // Validation "by hand" because of global validation pipe and
    // a need to return 401 instead of 400
    if (!dto.refreshToken) { 
      throw new UnauthorizedException('Refresh Token is missing');
    }
    return await this.authService.refresh(dto.refreshToken);
  }  
}
