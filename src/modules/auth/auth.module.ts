import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJwtStrategy } from './jwt-strategies/access-jwt.strategy';
import { RefreshJwtStrategy } from './jwt-strategies/refresh-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({})
  ],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}