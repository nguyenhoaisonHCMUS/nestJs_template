import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentConfig } from './configs/environment.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private environmentConfig: EnvironmentConfig) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnv() {
    const envValue = {
      port: this.environmentConfig.port,
      db_host: this.environmentConfig.db_host,
      db_name: this.environmentConfig.db_name,
      db_user: this.environmentConfig.db_user,
      db_password: this.environmentConfig.db_password || "hello",
      db_port: this.environmentConfig.db_port
    };
    return envValue;
  }
}
