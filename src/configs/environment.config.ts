import { ConfigService } from "@nestjs/config";
import exp from "constants";

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
    get jwts () {
        const secrets = {
            accessTokenSecret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            refreshTokenSecret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
            expiration: this.configService.get<string>('JWT_EXPIRATION'),
            refreshTokenExpiration: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),           
        }

        return secrets;
    }
}