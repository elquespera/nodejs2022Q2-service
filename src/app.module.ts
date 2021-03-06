import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavModule } from './modules/favs/favs.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, FavModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
