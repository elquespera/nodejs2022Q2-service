import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class SignupService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,    
  ) {}
  
  async signup(dto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(dto);
  }
  
}
