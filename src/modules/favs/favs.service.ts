import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { notFound, unprocessable } from '../utils';
import { Favorites, FavoritesRepsonse } from './favs.interface';

@Injectable()
export class FavService {
  private readonly favs: Favorites = {
    artistIds: [],
    albumIds: [],
    trackIds: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async findAll(): Promise<FavoritesRepsonse> {
    return {
      albums: [],//this.favs.albumIds.map((id) => this.albumService.findOne(id)),
      artists: this.favs.artistIds.map((id) => this.artistService.findOne(id)),
      tracks: this.favs.trackIds.map((id) => this.trackService.findOne(id)),
    };
  }

  addArtist(id: string) {
    if (this.artistService.contains(id)) {
      this.favs.artistIds.push(id);
    } else unprocessable();
  }

  deleteArtist(id: string, silent = false) {
    const index = this.favs.artistIds.findIndex((artistId) => id === artistId);
    if (index >= 0) {
      this.favs.artistIds.splice(index, 1);
    } else {
      if (!silent) notFound('artist', id);
    }
  }

  addAlbum(id: string) {
    if (this.albumService.contains(id)) {
      this.favs.albumIds.push(id);
    } else unprocessable();
  }

  deleteAlbum(id: string, silent = false) {
    const index = this.favs.albumIds.findIndex((albumId) => id === albumId);
    if (index >= 0) {
      this.favs.albumIds.splice(index, 1);
    } else {
      if (!silent) notFound('album', id);
    }
  }

  addTrack(id: string) {
    if (this.trackService.contains(id)) {
      this.favs.trackIds.push(id);
    } else unprocessable();
  }

  deleteTrack(id: string, silent = false) {
    const index = this.favs.trackIds.findIndex((trackId) => id === trackId);
    if (index >= 0) {
      this.favs.trackIds.splice(index, 1);
    } else {
      if (!silent) notFound('track', id);
    }
  }

  // getAll(): FavoritesRepsonse {
  //   return {
  //     artists: this.favs.map()
  //   }
  // }
}
