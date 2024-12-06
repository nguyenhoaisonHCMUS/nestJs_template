import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db_config } from './configs/db.config';
import { UserModule } from './user/user.module';
import { AccessTokenStrategy } from './auth/strategies/access.strategy';
import { RefreshTokenStrategy } from './auth/strategies/refresh.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(db_config),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
  exports: [],
})
export class AppModule {}
