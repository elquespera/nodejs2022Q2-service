import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { ArtistDto } from './artist.dto';
import { Artist } from './artist.interface';
import { FavService } from '../favs/favs.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  private artists: Array<Artist> = [];

  constructor(
    @Inject(forwardRef(() => FavService))
    private favService: FavService,

    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async findArtist(artistId: string, silent: boolean = false): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({ where: { id: artistId } });
    if (artist) return artist;
    if (!silent) notFound('artist', artistId);
    return undefined;
  }

  async contains(artistId: string): Promise<boolean> {
    return await this.findArtist(artistId, true) !== undefined;
    // return this.artists.some(({ id }) => artistId === id);
  }

  // findIndex(artistId: string): number {
  //   const index = this.artists.findIndex(({ id }) => artistId === id);
  //   if (index < 0) notFound('artist', artistId);
  //   return index;
  // }

  async findOne(id: string): Promise<ArtistEntity> {
    return await this.findArtist(id);
    // const index = this.findIndex(id);
    // return this.artists[index];
  }

  async findAll() {
    return await this.artistRepository.find();
    // return this.artists;
  }

  async create(dto: ArtistDto): Promise<Artist> {
    const createdArtist  = this.artistRepository.create(dto);    
    return await this.artistRepository.save(createdArtist);
    // const { name, grammy } = dto;
    // const newArtist: Artist = {
    //   id: uuidv4(),
    //   name,
    //   grammy,
    // };
    // this.artists.push(newArtist);
    // return newArtist;
  }

  async update(artistId: string, dto: ArtistDto): Promise<Artist> {
    const artist = await this.findOne(artistId);
    const { name, grammy } = dto;
    artist.name = name;
    artist.grammy = grammy;
    return await this.artistRepository.save(artist);
    // const { id } = artist;
    // const updatedArtist: Artist = {
    //   id,
    //   name,
    //   grammy,
    // };
    // this.artists.push(updatedArtist);
    // return updatedArtist;
  }

  async delete(id: string) {
    // const index = this.findIndex(id);

    await this.findOne(id);
    await this.artistRepository.delete(id); 
    this.favService.deleteArtist(id, true);
    this.albumService.deleteArtistRef(id);
    this.trackService.deleteArtistRef(id);
    // this.artists.splice(index, 1);
  }
}
