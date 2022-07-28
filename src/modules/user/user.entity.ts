import { Column, Entity } from 'typeorm';
import { UserDto } from './user.dto';
import { CommonEntity } from '../common.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  private timestamp = Date.now().toString();

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ type: 'int' })
  version = 1;

  @Column({ type: 'bigint' })
  createdAt: string = this.timestamp;

  @Column({ type: 'bigint' })
  updatedAt: string = this.timestamp;

  format(): UserDto {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: parseInt(createdAt),
      updatedAt: parseInt(updatedAt),
    };
  }
}
