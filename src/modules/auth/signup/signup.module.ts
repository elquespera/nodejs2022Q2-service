import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}