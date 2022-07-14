import { Inject, Injectable } from "@nestjs/common";
import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";
import { TrackService } from "../track/track.service";
import { notFound } from "../utils";
import { Favorites, FavoritesRepsonse } from "./favs.interface";

@Injectable()
export class FavService {
  private readonly favs: Favorites = {
    artistIds: [],
    albumIds: [],
    trackIds: []
  }

  constructor(
    @Inject(ArtistService)
    private artistService: ArtistService,

    @Inject(AlbumService)
    private albumService: AlbumService,

    @Inject(TrackService)
    private trackService: TrackService
  ) {}

  findAll(): FavoritesRepsonse {
    return {
      albums: this.favs.albumIds.map((id) => this.albumService.findOne(id)),
      artists: this.favs.artistIds.map((id) => this.artistService.findOne(id)),
      tracks: this.favs.trackIds.map((id) => this.trackService.findOne(id)),
    }
  }

  addArtist(id: string) {
    this.artistService.findOne(id);
    this.favs.artistIds.push(id);
  }

  deleteArtist(id: string) {
    const index = this.favs.artistIds.findIndex((artistId) => id === artistId);
    if (index < 0) notFound('artist', id);
    this.favs.artistIds.splice(index, 1);
  }

  addAlbum(id: string) {
    this.albumService.findOne(id);
    this.favs.albumIds.push(id);
  }

  deleteAlbum(id: string) {
    const index = this.favs.albumIds.findIndex((albumId) => id === albumId);
    if (index < 0) notFound('album', id);
    this.favs.albumIds.splice(index, 1);
  }

  addTrack(id: string) {
    this.trackService.findOne(id);
    this.favs.trackIds.push(id);
  }

  deleteTrack(id: string) {
    const index = this.favs.trackIds.findIndex((trackId) => id === trackId);
    if (index < 0) notFound('track', id);
    this.favs.trackIds.splice(index, 1);
  }

  

  // getAll(): FavoritesRepsonse {
  //   return {
  //     artists: this.favs.map()
  //   }
  // }
}