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

  async findArtist(artistId: string, silent = false): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (artist) return artist;
    if (!silent) notFound('artist', artistId);
    return undefined;
  }

  async contains(artistId: string): Promise<boolean> {
    return (await this.findArtist(artistId, true)) !== undefined;
  }

  async findOne(id: string): Promise<ArtistEntity> {
    return await this.findArtist(id);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async create(dto: ArtistDto): Promise<Artist> {
    const createdArtist = this.artistRepository.create(dto);
    return await this.artistRepository.save(createdArtist);
  }

  async update(artistId: string, dto: ArtistDto): Promise<Artist> {
    const artist = await this.findOne(artistId);
    const { name, grammy } = dto;
    artist.name = name;
    artist.grammy = grammy;
    return await this.artistRepository.save(artist);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.favService.deleteArtist(id, true);
    await this.albumService.deleteArtistRef(id);
    await this.trackService.deleteArtistRef(id);
    await this.artistRepository.delete(id);
  }
}
