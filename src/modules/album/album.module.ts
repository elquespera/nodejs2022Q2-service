import { forwardRef, Module } from '@nestjs/common';
import { FavModule } from '../favs/favs.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [forwardRef(() => FavModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService]
})
export class AlbumModule {}
