import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { FavModule } from './modules/favs/favs.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LoggerModule } from './modules/logger/logger.module';
import { HttpLoggerMiddleware } from './modules/logger/logger.middleware';
import { HttpExceptionFilter } from './modules/exceptions/http.exception';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
