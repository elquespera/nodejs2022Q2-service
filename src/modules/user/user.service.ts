import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UserDto, UpdatePasswordDto } from './user.dto';
import { forbidden, notFound } from '../utils';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private hash(data: string) {
    return bcrypt.hash(data, 10);
  }

  async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) notFound('user', id);
    return user;
  }

  async findOne(userId: string): Promise<UserDto> {
    const user = await this.findUser(userId);
    return user.format();
  }

  async match(dto: CreateUserDto): Promise<UserEntity> {
    const users = await this.userRepository.find();
    return users.find(async ({ login, password }) => login === dto.login && await bcrypt.compare(password, dto.password));
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.format());
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const passwordHash = await this.hash(dto.password);
    const createdUser = this.userRepository.create({ login: dto.login, password: passwordHash });
    const savedUser = await this.userRepository.save(createdUser); 
    return savedUser.format();
  }

  async update(userId: string, updateDto: UpdatePasswordDto): Promise<UserDto> {
    const updatedUser = await this.findUser(userId);
    const doPasswordsMatch = await bcrypt.compare(updateDto.oldPassword, updatedUser.password);
    if (!doPasswordsMatch)
      forbidden(`The old password does not match`);

    updatedUser.password = await this.hash(updateDto.newPassword);
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
