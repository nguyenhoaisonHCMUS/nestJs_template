import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/libs/baseEntity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;
}