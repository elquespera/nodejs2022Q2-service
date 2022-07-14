import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto, CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { verifyUUID } from './../utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll():Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<UserDto>  {
    verifyUUID(id);
    const user = this.userService.findOne(id);
    return user;
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateDto: UpdatePasswordDto): Promise<UserDto>  {
    verifyUUID(id);
    return this.userService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id): Promise<any>  {
    verifyUUID(id);
    return this.userService.delete(id);
  }
}