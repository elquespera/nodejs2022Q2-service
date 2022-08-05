import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { forbidden } from '../utils';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,    
  ) {}
  
  async signup(dto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }

  async login(dto: CreateUserDto): Promise<any> {
    const user = await this.userService.match(dto);
    if (!user) forbidden('Invalid login or password');
    const payload = { userId: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
  
}
