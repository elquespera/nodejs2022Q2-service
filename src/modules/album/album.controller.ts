import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AlbumDto } from './album.dto';
import { AlbumService } from './album.service';
import { UUIDParams } from '../uuidParams';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll():Promise<any[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params: UUIDParams): Promise<any>  {
    return this.albumService.findOne(params.id);
  }
  
  @Post()
  async create(@Body() albumDto: AlbumDto): Promise<any> {
    return this.albumService.create(albumDto);
  }

  @Put(':id')
  async update(@Param() params: UUIDParams, @Body() albumDto: AlbumDto): Promise<any>  {
    return this.albumService.update(params.id, albumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: UUIDParams): Promise<any>  {
    return this.albumService.delete(params.id);
  }
}