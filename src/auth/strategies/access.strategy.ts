import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppConfig } from "src/common/constants";
import { UserService } from "src/user/user.service";

type JwtPayload = {
    sub: string;
    email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AppConfig.JWT_ACCESS_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    return await this.userService.findOne(+payload.sub);
  }
}