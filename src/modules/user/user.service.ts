import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UserDto, UpdatePasswordDto } from './user.dto';
import { forbidden, notFound } from '../utils';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) notFound('user', userId);
    return user;
  }

  async findOne(userId: string): Promise<UserDto> {
    const user = await this.findUser(userId);
    return user.format();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(user => user.format());
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const createdUser  = this.userRepository.create(dto);    
    const savedUser = await this.userRepository.save(createdUser);
    return savedUser.format();
  }

  async update(userId: string, updateDto: UpdatePasswordDto): Promise<UserDto> {
    const updatedUser = await this.findUser(userId);

    if (updatedUser.password !== updateDto.oldPassword)
      forbidden(`The old password does not match`);

    updatedUser.password = updateDto.newPassword;
    updatedUser.version += 1;
    updatedUser.updatedAt = Date.now().toString();

    const savedUser = await this.userRepository.save(updatedUser);
    return savedUser.format();
  }

  async delete(id: string) {
    await this.findUser(id);
    await this.userRepository.delete(id);
  }
}
