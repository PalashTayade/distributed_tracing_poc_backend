import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1609800960000 implements MigrationInterface {
    name = 'initial1609800960000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isactive" boolean NOT NULL DEFAULT true, "firstname" character varying(300) NOT NULL, "lastname" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, CONSTRAINT "PK_6354132ccf58347fa5c9b3a6fc7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dbo"."employees"`);
    }

}
