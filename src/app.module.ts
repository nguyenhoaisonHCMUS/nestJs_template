import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from './configs/environment.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db_config } from './configs/db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(db_config),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: EnvironmentConfig,
      useFactory: (configService: ConfigService) => {
        return new EnvironmentConfig(configService);
      },
      inject: [ConfigService],
    }
  ],
  exports: [EnvironmentConfig],
})
export class AppModule {}
