import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';


@Entity('user')
export class UserEntity {
  private timestamp = Date.now().toString();

  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4(); // uuid v4
  
  @Column()
  login: string;

  @Column()
  password: string;
  
  @Column({ type: 'int' })
  version: number = 1;
  
  @Column({ type: 'bigint' })
  createdAt: string = this.timestamp;
  
  @Column({ type: 'bigint' })
  updatedAt: string = this.timestamp;

  format(): UserDto {
    const { id, login, version, createdAt, updatedAt } = this;
    return { 
      id, login, version, 
      createdAt: parseInt(createdAt), 
      updatedAt: parseInt(updatedAt),
    };
  }
}