import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { AppConfig } from 'src/common/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(data: AuthDto, res: Response): Promise<void> {
        const user = await this.userService.validateUser(data.email, data.password);
        if (!user) throw new NotFoundException('Email or password invalid!');
    
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload, { secret: AppConfig.JWT_ACCESS_KEY, expiresIn: AppConfig.JWT_EXPIRATION });
        const refreshToken = this.jwtService.sign(payload, { secret: AppConfig.JWT_REFRESH_KEY,expiresIn: AppConfig.REFRESH_TOKEN_EXPIRATION });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, //AppConfig.NODE_ENV === 'production', // Chỉ bật secure khi ở môi trường production
            maxAge: AppConfig.REFRESH_TOKEN_EXPIRATION * 1000,
            sameSite: 'strict',
        });

        res.status(200).json({ accessToken });
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto);
    }

    async refreshToken(res: Response, req: Request): Promise<void> {
        try {
            const { user, refreshToken } = req.user as {user: any, refreshToken: string};
            if (!user || !refreshToken) throw new UnauthorizedException('Invalid data!');

            const payload = { email: user.email, sub: user.id };
            const accessToken = this.jwtService.sign(payload, { secret: AppConfig.JWT_ACCESS_KEY, expiresIn: AppConfig.JWT_EXPIRATION });
            const newRefreshToken = this.jwtService.sign(payload, { secret: AppConfig.JWT_REFRESH_KEY,expiresIn: AppConfig.REFRESH_TOKEN_EXPIRATION, });

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: AppConfig.REFRESH_TOKEN_EXPIRATION * 1000,
                sameSite: 'strict',
            });

            res.send({ accessToken });
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

}
