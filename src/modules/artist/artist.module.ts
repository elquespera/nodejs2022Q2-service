import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { FavModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    forwardRef(() => FavModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
