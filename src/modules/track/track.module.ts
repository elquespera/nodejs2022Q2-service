import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavModule } from '../favs/favs.module';
import { TrackController } from './track.controller';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Module({
  imports: [
    forwardRef(() => FavModule),
    TypeOrmModule.forFeature([TrackEntity])
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
