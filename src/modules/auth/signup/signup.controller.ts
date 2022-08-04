import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateUserDto } from '../../user/user.dto';
// import { UUIDParams } from '../uuidParams';

@Controller('auth/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.signupService.signup(userDto);
  }
}
