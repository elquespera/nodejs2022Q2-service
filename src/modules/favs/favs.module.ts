import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { FavController } from './favs.controller';
import { FavService } from './favs.service';

@Module({
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule), 
    forwardRef(() => TrackModule)],
  controllers: [FavController],
  providers: [FavService],
  exports: [FavService]
})
export class FavModule {}