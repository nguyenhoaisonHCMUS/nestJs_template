import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { Role } from 'src/common/enums/role';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async createUser(CreateUserDto: CreateUserDto): Promise<any> {
        const existingUser = await this.userRepo.findOne({ where: { email : CreateUserDto.email } });
        if (existingUser) throw new BadRequestException('Email already exists');
    
        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
        const newUser = this.userRepo.create({ ...CreateUserDto, password: hashedPassword });
        console.log(newUser);
        this.userRepo.save(newUser); 

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...safeUser } = newUser;
        return safeUser;
    }

    async findAll() {
        return await this.userRepo.find({
            select: ['id', 'username', 'email', 'role'],
            where: { deletedAt: null, role: Not(Role.ADMIN) },
        });
    }

    async findOne (id: number) {
        return await this.userRepo.find({
            select: ['id', 'username', 'email', 'role'],
            where: { deletedAt: null, id: id },
        })
    }

    async findbyID(id: number): Promise<UserEntity> {
        const user = await this.userRepo.findOneBy({ id });
        if (user) {
            return user;
        }
        return null;
    }

    async validateUser(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.userRepo.findOneBy({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
    }
}
