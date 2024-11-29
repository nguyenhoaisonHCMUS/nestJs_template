import { ConfigService } from "@nestjs/config";

export class EnvironmentConfig {
    constructor( private readonly configService: ConfigService) {}

    get port() {
        return this.configService.get<number>('PORT');
    }

    get db_host() {
        return this.configService.get<string>('DB_HOST');
    }

    get db_port() {
        return this.configService.get<string>('DB_PORT');
    }

    get db_name() {
        return this.configService.get<string>('DB_NAME');    
    }

    get db_user() {
        return this.configService.get<string>('DB_USER');
    }

    get db_password() { 
        return this.configService.get<string>('DB_PASS');
    }
}