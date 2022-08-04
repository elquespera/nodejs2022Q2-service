import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}