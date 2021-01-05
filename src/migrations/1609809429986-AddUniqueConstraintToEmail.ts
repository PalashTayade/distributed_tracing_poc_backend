import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueConstraintToEmail1609809429986 implements MigrationInterface {
    name = 'AddUniqueConstraintToEmail1609809429986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "dbo"."employees"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."employees" ADD CONSTRAINT "UQ_2b6faf175208908c9ab6d543714" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."employees" DROP CONSTRAINT "UQ_2b6faf175208908c9ab6d543714"`);
        await queryRunner.query(`COMMENT ON COLUMN "dbo"."employees"."email" IS NULL`);
    }

}
