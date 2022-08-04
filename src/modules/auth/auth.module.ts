import { Module } from '@nestjs/common';
import { SignupModule } from './signup/signup.module';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  // controllers: [UserController],
  // providers: [UserService],
  imports: [SignupModule]
})
export class AuthModule {}