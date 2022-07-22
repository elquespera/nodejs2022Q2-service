import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [
    forwardRef(() => FavModule), 
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
