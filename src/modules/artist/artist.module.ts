import { forwardRef, Module } from '@nestjs/common';
import { FavModule } from '../favs/favs.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [forwardRef(() => FavModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})
export class ArtistModule {}
