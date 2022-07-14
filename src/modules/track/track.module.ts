import { forwardRef, Module } from '@nestjs/common';
import { FavModule } from '../favs/favs.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [forwardRef(() => FavModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
