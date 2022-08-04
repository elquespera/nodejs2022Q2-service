import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { forbidden } from 'src/modules/utils';


@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    
    @Inject(forwardRef(() => UserService))
    private userService: UserService,    
  ) {}
  
  async login(dto: CreateUserDto): Promise<any> {
    const user = await this.userService.match(dto);

    return user ? user.format() : forbidden('Invalid login or password');
  }
  
}
