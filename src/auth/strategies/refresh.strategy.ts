import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppConfig } from "src/common/constants";
import { JwtPayload } from "src/common/constants/types";
import { UserService } from "src/user/user.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
            // console.log("req.cookies at refresh strategy: ", req.cookies);
          return req?.cookies?.refreshToken;
        }
      ]),
      secretOrKey: AppConfig.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies.refreshToken;
    const user = await this.userService.findOne(+payload.sub);

    return { user, refreshToken };
  }
}
