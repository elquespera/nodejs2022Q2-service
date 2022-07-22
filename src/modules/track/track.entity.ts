import { Column, Entity } from "typeorm";
import { CommonEntity } from "../common.entity";

@Entity('track')
export class TrackEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column({ type: 'int'})
  duration: number; // integer number
}
