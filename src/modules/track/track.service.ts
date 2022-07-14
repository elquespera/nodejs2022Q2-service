import { Injectable } from "@nestjs/common";
import { notFound } from "../utils";
import { TrackDto } from "./track.dto";
import { Track } from "./track.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  // private tracks: Array<Track> = [];
  private readonly tracks: Array<Track> = [{
    id: 'id',
    name: 'Something',
    albumId: 'id',
    artistId: 'id',
    duration: 120,
  }];

  findIndex(trackId: string): number {
    const index = this.tracks.findIndex(({ id }) => trackId === id);
    if (index < 0) notFound('track', trackId);
    return index;
  }

  findOne(id: string): Track {
    const index = this.findIndex(id); 
    return this.tracks[index];
  }

  findAll(): Array<Track> {
    return this.tracks; 
  }

  create(dto: TrackDto): Track {
    const { name, artistId, albumId, duration } = dto;
    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration
    }
    this.tracks.push(newTrack);
    return newTrack;
  } 

  update(trackId: string, dto: TrackDto): Track {
    const track = this.findOne(trackId);
    const { id } = track;
    const { name, artistId, albumId, duration } = dto;
    const updatedTrack: Track = {
      id,
      name,
      artistId,
      albumId,
      duration
    }
    this.tracks.push(updatedTrack);
    return updatedTrack;
  } 

  delete(id: string): any {
    const index = this.findIndex(id);
    this.tracks.splice(index, 1);
  }
}