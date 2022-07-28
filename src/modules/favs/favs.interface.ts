import { Artist } from '../artist/artist.interface';
import { Album } from '../album/album.interface';
import { Track } from '../track/track.interface';

export interface Favorites {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
