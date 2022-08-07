import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { notFound } from '../utils';
import { TrackDto } from './track.dto';
import { TrackEntity } from './track.entity';
import { FavService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavService))
    private favService: FavService,

    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async findTrack(trackId: string, silent = false): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (track) return track;
    if (!silent) notFound('track', trackId);
    return undefined;
  }

  async contains(trackId: string): Promise<boolean> {
    return (await this.findTrack(trackId, true)) !== undefined;
  }

  async findOne(id: string): Promise<TrackEntity> {
    return await this.findTrack(id);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async create(dto: TrackDto): Promise<TrackEntity> {
    const createdTrack = this.trackRepository.create(dto);
    return await this.trackRepository.save(createdTrack);
  }

  async update(trackId: string, dto: TrackDto): Promise<TrackEntity> {
    const track = await this.findOne(trackId);
    const { name, artistId, albumId, duration } = dto;
    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;
    return await this.trackRepository.save(track);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.favService.deleteTrack(id, true);
    await this.trackRepository.delete(id);
  }

  async deleteArtistRef(artistId: string) {
    const tracks = await this.findAll();
    tracks.forEach(async (track) => {
      if (track.artistId === artistId) {
        const { name, albumId, duration } = track;
        await this.update(track.id, {
          name,
          artistId: null,
          albumId,
          duration,
        });
      }
    });
  }

  async deleteAlbumRef(albumId: string) {
    const tracks = await this.findAll();
    tracks.forEach(async (track) => {
      if (track.albumId === albumId) {
        const { name, artistId, duration } = track;
        await this.update(track.id, {
          name,
          artistId,
          albumId: null,
          duration,
        });
      }
    });
  }
}
