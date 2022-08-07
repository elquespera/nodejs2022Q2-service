import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { AlbumDto } from './album.dto';
import { FavService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavService))
    private favService: FavService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async findAlbum(albumId: string, silent = false): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (album) return album;
    if (!silent) notFound('album', albumId);
    return undefined;
  }

  async contains(albumId: string): Promise<boolean> {
    return (await this.findAlbum(albumId, true)) !== undefined;
  }

  async findOne(id: string): Promise<AlbumEntity> {
    return await this.findAlbum(id);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async create(dto: AlbumDto): Promise<AlbumEntity> {
    const createdAlbum = this.albumRepository.create(dto);
    return await this.albumRepository.save(createdAlbum);
  }

  async update(albumId: string, dto: AlbumDto): Promise<AlbumEntity> {
    const album = await this.findOne(albumId);
    const { name, year, artistId } = dto;
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return await this.albumRepository.save(album);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.trackService.deleteAlbumRef(id);
    await this.favService.deleteAlbum(id, true);
    await this.albumRepository.delete(id);
  }

  async deleteArtistRef(artistId: string) {
    const albums = await this.findAll();
    albums.forEach(async (album) => {
      if (album.artistId === artistId) {
        const { name, year } = album;
        await this.update(album.id, { name, artistId: null, year });
      }
    });
  }
}
