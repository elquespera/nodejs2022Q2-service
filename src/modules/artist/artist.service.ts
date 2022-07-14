import { Injectable } from "@nestjs/common";
import { notFound } from "../utils";
import { ArtistDto } from "./artist.dto";
import { Artist } from "./artist.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  // private artists: Array<User> = [];
  private readonly artists: Array<Artist> = [{
    id: 'id',
    name: 'Adele',
    grammy: true,
  }];

  findIndex(artistId: string): number {
    const index = this.artists.findIndex(({ id }) => artistId === id);
    if (index < 0) notFound('artistd', artistId);
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
    }
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
    }
    this.artists.push(updatedArtist);
    return updatedArtist;
  } 

  delete(id: string): any {
    const index = this.findIndex(id);
    this.artists.splice(index, 1);
  }
}