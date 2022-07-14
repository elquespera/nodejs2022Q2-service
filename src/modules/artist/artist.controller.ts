import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArtistDto } from './artist.dto';
import { ArtistService } from './artist.service';
import { UUIDParams } from '../uuidParams';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll():Promise<any[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params: UUIDParams): Promise<any>  {
    return this.artistService.findOne(params.id);
  }
  
  @Post()
  async create(@Body() artistDto: ArtistDto): Promise<any> {
    return this.artistService.create(artistDto);
  }

  @Put(':id')
  async update(@Param() params: UUIDParams, @Body() artistDto: ArtistDto): Promise<any>  {
    return this.artistService.update(params.id, artistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: UUIDParams): Promise<any>  {
    return this.artistService.delete(params.id);
  }
}