import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { AlbumDto } from './album.dto';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { FavService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  private albums: Array<Album> = [];

  constructor(
    @Inject(forwardRef(() => FavService))
    private favService: FavService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  contains(albumId: string): boolean {
    return this.albums.some(({ id }) => albumId === id);
  }

  findIndex(albumId: string): number {
    const index = this.albums.findIndex(({ id }) => albumId === id);
    if (index < 0) notFound('album', albumId);
    return index;
  }

  findOne(id: string): Album {
    const index = this.findIndex(id);
    return this.albums[index];
  }

  findAll(): Array<Album> {
    return this.albums;
  }

  create(dto: AlbumDto): Album {
    const { name, year, artistId } = dto;
    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(albumId: string, dto: AlbumDto): Album {
    const album = this.findOne(albumId);
    const { id } = album;
    const { name, year, artistId } = dto;
    const updatedAlbum: Album = {
      id,
      name,
      year,
      artistId,
    };
    this.albums.push(updatedAlbum);
    return updatedAlbum;
  }

  delete(id: string): any {
    const index = this.findIndex(id);
    this.favService.deleteAlbum(id, true);
    this.trackService.deleteAlbumRef(id);
    this.albums.splice(index, 1);
  }

  deleteArtistRef(artistId: string) {
    this.albums.forEach((album, index) => {
      if (album.artistId === artistId) {
        this.albums[index].artistId = null;
      }
    });
  }
}
