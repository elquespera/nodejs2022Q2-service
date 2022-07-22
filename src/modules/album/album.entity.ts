import { Column, Entity } from "typeorm";
import { CommonEntity } from "../common.entity";

@Entity('album')
export class AlbumEntity extends CommonEntity {
  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ })
  artistId: string | null;
}
