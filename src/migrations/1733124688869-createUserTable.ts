import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1733124688869 implements MigrationInterface {
    name = 'CreateUserTable1733124688869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
