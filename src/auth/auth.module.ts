import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/common/constants';


@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      global: true,
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
