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

  async findAlbum(albumId: string, silent: boolean = false): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: albumId } });
    if (album) return album;
    if (!silent) notFound('album', albumId);
    return undefined;
  }

  async contains(albumId: string): Promise<boolean> {
    return await this.findAlbum(albumId, true) !== undefined;
    // return this.albums.some(({ id }) => albumId === id);
  }

  // findIndex(albumId: string): number {
  //   const index = this.albums.findIndex(({ id }) => albumId === id);
  //   if (index < 0) notFound('album', albumId);
  //   return index;
  // }

  async findOne(id: string): Promise<AlbumEntity> {
    return await this.findAlbum(id);
    // const index = this.findIndex(id);
    // return this.albums[index];
  }

  async findAll() {
    return await this.albumRepository.find();
    // return this.albums;
  }

  async create(dto: AlbumDto): Promise<AlbumEntity> {
    const createdAlbum  = this.albumRepository.create(dto);    
    return await this.albumRepository.save(createdAlbum);
    // const { name, year, artistId } = dto;
    // const newAlbum: Album = {
    //   id: uuidv4(),
    //   name,
    //   year,
    //   artistId,
    // };
    // this.albums.push(newAlbum);
    // return newAlbum;
  }

  async update(albumId: string, dto: AlbumDto): Promise<AlbumEntity> {
    const album = await this.findOne(albumId);
    const { name, year, artistId } = dto;
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return await this.albumRepository.save(album);

    // const { id } = album;
    // const updatedAlbum: Album = {
    //   id,
    //   name,
    //   year,
    //   artistId,
    // };
    // this.albums.push(updatedAlbum);
    // return updatedAlbum;
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.albumRepository.delete(id); 
    this.favService.deleteAlbum(id, true);
    this.trackService.deleteAlbumRef(id);

    // const index = this.findIndex(id);
    // this.favService.deleteAlbum(id, true);
    // this.trackService.deleteAlbumRef(id);
    // this.albums.splice(index, 1);
  }

  deleteArtistRef(artistId: string) {
    // const matchingAlbums = await this.albumRepository.find({ artistId: artistId });

    // this.albums.forEach((album, index) => {
    //   if (album.artistId === artistId) {
    //     this.albums[index].artistId = null;
    //   }
    // });
  }
}
