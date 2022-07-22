import { Artist } from '../artist/artist.interface';
import { AlbumEntity } from '../album/album.entity';
import { Track } from '../track/track.interface';

export interface Favorites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: AlbumEntity[];
  tracks: Track[];
}
