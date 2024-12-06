import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.gaurd';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role';
import { RolesGuard } from 'src/common/guards/role.gaurd';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.gaurd';

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
    @UseGuards(RefreshTokenGuard)
    async refreshToken (@Req() req: Request, @Res() res: Response,) {
        await this.authService.refreshToken(res, req);
    }

    @Get('profile')
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles(Role.ADMIN)
    getProfile(@Req() req) {
        return req.user;
    }
}
