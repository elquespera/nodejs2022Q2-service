import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { notFound, unprocessable } from '../utils';
import { FavoriteArtistsEntity, FavoriteAlbumsEntity, FavoriteTracksEntity } from './favs.entity';
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

    @InjectRepository(FavoriteArtistsEntity)
    private favArtistRepository: Repository<FavoriteArtistsEntity>,

    @InjectRepository(FavoriteAlbumsEntity)
    private favAlbumRepository: Repository<FavoriteAlbumsEntity>,

    @InjectRepository(FavoriteTracksEntity)
    private favTrackRepository: Repository<FavoriteTracksEntity>,

    ) {}

  async findAll(): Promise<FavoritesRepsonse> {
    const artists = await this.favArtistRepository.find({ loadEagerRelations: true});
    const albums = await this.favAlbumRepository.find({ loadEagerRelations: true});
    const tracks = await this.favTrackRepository.find({ loadEagerRelations: true});
    return {
      artists: artists.map(artist => artist.artist),
      albums: albums.map(album => album.album),
      tracks: tracks.map(track => track.track),
    };
  }

  async addArtist(id: string) {
    const artist = await this.artistService.findArtist(id, true);
    if (artist) {
      const favArtist = this.favArtistRepository.create({ artist });
      await this.favArtistRepository.save(favArtist);
    }
      else unprocessable();
  }

  async deleteArtist(id: string, silent = false) {
    const artists = await this.favArtistRepository.find();
    const index = artists.findIndex(artist => artist?.artist.id === id )
    if (index >= 0) {
      await this.favArtistRepository.delete(artists[index].id);
    } else {
      // if (!silent) notFound('artist', id);
    }
  }

  async addAlbum(id: string) {
    const album = await this.albumService.findAlbum(id, true);
    if (album) {
      const favAlbum = this.favAlbumRepository.create({ album });
      await this.favAlbumRepository.save(favAlbum);
    }
      else unprocessable();
  }

  async deleteAlbum(id: string, silent = false) {
    const albums = await this.favAlbumRepository.find();
    const index = albums.findIndex(album => album.album.id === id )
    if (index >= 0) {
      this.favAlbumRepository.delete(albums[index].id);
    } else {
      // if (!silent) notFound('album', id);
    }
  }

  async addTrack(id: string) {
    const track = await this.trackService.findTrack(id, true);
    if (track) {
      const favTrack = this.favTrackRepository.create({ track });
      await this.favTrackRepository.save(favTrack);
    }
      else unprocessable();
  }

  async deleteTrack(id: string, silent = false) {
    const tracks = await this.favTrackRepository.find();
    const index = tracks.findIndex(track => track.track.id === id )
    if (index >= 0) {
      this.favTrackRepository.delete(tracks[index].id);
    } else {
      // if (!silent) notFound('track', id);
    }
  }

}
