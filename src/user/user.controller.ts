import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.gaurd';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enums/role';
import { RolesGuard } from 'src/common/guards/role.gaurd';

@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService) {}
    
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    // @Roles(Role.ADMIN)
    getAllUsers() {
        return this.userService.findAll();
    }
}
