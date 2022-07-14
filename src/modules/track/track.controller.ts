import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TrackDto } from './track.dto';
import { TrackService } from './track.service';
import { UUIDParams } from '../uuidParams';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll():Promise<any[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async getOne(@Param() params: UUIDParams): Promise<any>  {
    return this.trackService.findOne(params.id);
  }
  
  @Post()
  async create(@Body() trackDto: TrackDto): Promise<any> {
    return this.trackService.create(trackDto);
  }

  @Put(':id')
  async update(@Param() params: UUIDParams, @Body() trackDto: TrackDto): Promise<any>  {
    return this.trackService.update(params.id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: UUIDParams): Promise<any>  {
    return this.trackService.delete(params.id);
  }
}