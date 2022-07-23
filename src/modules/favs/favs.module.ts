import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { FavController } from './favs.controller';
import { FavoriteArtistsEntity, FavoriteAlbumsEntity, FavoriteTracksEntity } from './favs.entity';
import { FavService } from './favs.service';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([FavoriteArtistsEntity]),
    TypeOrmModule.forFeature([FavoriteAlbumsEntity]),
    TypeOrmModule.forFeature([FavoriteTracksEntity]),
  ],
  controllers: [FavController],
  providers: [FavService],
  exports: [FavService],
})
export class FavModule {}
