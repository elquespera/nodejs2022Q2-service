import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto, CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll():Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params): Promise<UserDto>  {
    return this.userService.findOne(params.id);
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param() params, @Body() updateDto: UpdatePasswordDto): Promise<UserDto>  {
    return this.userService.update(params.id, updateDto);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<any>  {
    return this.userService.delete(params.id);
  }
}