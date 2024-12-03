import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/libs/baseEntity";
import { Role } from "src/common/enums/role";

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255 , default: Role.USER})
    role: Role;

}