import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UUIDParams } from '../uuidParams';
import { FavService } from './favs.service';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  async getAll(): Promise<any> {
    return this.favService.findAll();
  }

  //Artist
  @Post('/artist/:id')
  async addArtist(@Param() params: UUIDParams): Promise<any> {
    return this.favService.addArtist(params.id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: UUIDParams): Promise<any> {
    this.favService.deleteArtist(params.id);
  }

  //Album
  @Post('/album/:id')
  async addAlbum(@Param() params: UUIDParams): Promise<any> {
    return this.favService.addAlbum(params.id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: UUIDParams): Promise<any> {
    this.favService.deleteAlbum(params.id);
  }

  //Track
  @Post('/track/:id')
  async addTrack(@Param() params: UUIDParams): Promise<any> {
    return this.favService.addTrack(params.id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: UUIDParams): Promise<any> {
    this.favService.deleteTrack(params.id);
  }
}
