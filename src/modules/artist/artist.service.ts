import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { ArtistDto } from './artist.dto';
import { Artist } from './artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { FavService } from '../favs/favs.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  // private artists: Array<Artist> = [];
  private readonly artists: Array<Artist> = [
    {
      id: 'e493c68b-3a4a-4daf-b051-33eaf34d8e26',
      name: 'Adele',
      grammy: true,
    },
  ];

  constructor(
    @Inject(forwardRef(() => FavService))
    private favService: FavService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  contains(artistId: string): boolean {
    return this.artists.some(({ id }) => artistId === id);
  }

  findIndex(artistId: string): number {
    const index = this.artists.findIndex(({ id }) => artistId === id);
    if (index < 0) notFound('artist', artistId);
    return index;
  }

  findOne(id: string): Artist {
    const index = this.findIndex(id);
    return this.artists[index];
  }

  findAll(): Array<Artist> {
    return this.artists;
  }

  create(dto: ArtistDto): Artist {
    const { name, grammy } = dto;
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(artistId: string, dto: ArtistDto): Artist {
    const artist = this.findOne(artistId);
    const { id } = artist;
    const { name, grammy } = dto;
    const updatedArtist: Artist = {
      id,
      name,
      grammy,
    };
    this.artists.push(updatedArtist);
    return updatedArtist;
  }

  delete(id: string): any {
    const index = this.findIndex(id);
    this.favService.deleteArtist(id, true);
    this.albumService.deleteArtistRef(id);
    this.trackService.deleteArtistRef(id);
    this.artists.splice(index, 1);
  }
}
