import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlbumEntity } from "../album/album.entity";
import { ArtistEntity } from "../artist/artist.entity";
import { TrackEntity } from "../track/track.entity";

class FavoritesEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number
}

@Entity('favorite-artists')
export class FavoriteArtistsEntity extends FavoritesEntity {
  @OneToOne(() => ArtistEntity, { eager: true })
  @JoinColumn()
  artist: ArtistEntity;
}

@Entity('favorite-albums')
export class FavoriteAlbumsEntity extends FavoritesEntity {
  @OneToOne(() => AlbumEntity, { eager: true })
  @JoinColumn()
  album: AlbumEntity;
}

@Entity('favorite-tracks')
export class FavoriteTracksEntity extends FavoritesEntity {
  @OneToOne(() => TrackEntity, { eager: true })
  @JoinColumn()
  track: TrackEntity;
}
