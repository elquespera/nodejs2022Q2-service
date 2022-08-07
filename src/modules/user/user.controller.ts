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
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { UUIDParams } from '../uuidParams';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<any[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params: UUIDParams): Promise<any> {
    return await this.userService.findOne(params.id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param() params: UUIDParams,
    @Body() updateDto: UpdatePasswordDto,
  ): Promise<any> {
    return await this.userService.update(params.id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: UUIDParams): Promise<any> {
    return await this.userService.delete(params.id);
  }
}
