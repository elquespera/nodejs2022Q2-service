import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import { forbidden, notFound } from '../utils';

@Injectable()
export class UserService {
  // private users: Array<User> = [];
  private readonly users: Array<User> = [
    {
      id: 'id',
      login: 'login',
      password: 'pswd',
      version: 1,
      createdAt: 21341324,
      updatedAt: 234124,
    },
  ];

  private formatUser(index: number): UserDto {
    const user = this.users[index];
    if (!user) return undefined;
    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  findIndex(userId: string): number {
    const index = this.users.findIndex(({ id }) => userId === id);
    if (index < 0) notFound('user', userId);
    return index;
  }

  findOne(userId: string): UserDto {
    const index = this.findIndex(userId);
    return this.formatUser(index);
  }

  findAll(): Array<UserDto> {
    return this.users.map((user, index) => this.formatUser(index));
  }

  create(dto: CreateUserDto): UserDto {
    const { login, password } = dto;
    const timestamp = Date.now();
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);
    return this.formatUser(this.users.length - 1);
  }

  update(userId: string, updateDto: UpdatePasswordDto): UserDto {
    const userIndex = this.findIndex(userId);
    const user = this.users[userIndex];
    const { id, createdAt, version, login, password } = user;
    if (password !== updateDto.oldPassword)
      forbidden(`The old password does not match`);
    const updatedUser: User = {
      id,
      login,
      password: updateDto.newPassword,
      version: version + 1,
      createdAt,
      updatedAt: Date.now(),
    };
    this.users[userIndex] = updatedUser;
    return this.formatUser(userIndex);
  }

  delete(id: string): any {
    const index = this.findIndex(id);
    this.users.splice(index, 1);
  }
}
