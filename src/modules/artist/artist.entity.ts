import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common.entity';

@Entity('artist')
export class ArtistEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
