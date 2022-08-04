import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    SignupModule, 
    LoginModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret',
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}