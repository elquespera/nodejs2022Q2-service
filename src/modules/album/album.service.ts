import { Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { AlbumDto } from './album.dto';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  // private artists: Array<Album> = [];
  private readonly albums: Array<Album> = [
    {
      id: 'id',
      name: 'Adele',
      year: 2008,
      artistId: null,
    },
  ];

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
    this.albums.splice(index, 1);
  }
}
