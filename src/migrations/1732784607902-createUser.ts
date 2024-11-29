import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1732784607902 implements MigrationInterface {
    name = 'CreateUser1732784607902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "username" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
