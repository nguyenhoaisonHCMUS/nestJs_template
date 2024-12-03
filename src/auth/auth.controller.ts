import { Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp (@Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.authService.signUp(createUserDto);
    }

    @Post('signin')
    async signIn (@Body() data: AuthDto, @Res() res: Response): Promise<any> {
        await this.authService.signIn(data, res);
    }

    @Post('refresh')
    async refreshToken (@Req() req: Request, @Res() res: Response): Promise<any> {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            throw new UnauthorizedException('Invalid refresh token');
        }
        
        return await this.authService.refreshToken(refreshToken, res);
    }
}
