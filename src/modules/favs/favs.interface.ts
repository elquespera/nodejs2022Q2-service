import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { ArtistEntity } from '../artist/artist.entity';

export interface Favorites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export interface FavoritesRepsonse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
