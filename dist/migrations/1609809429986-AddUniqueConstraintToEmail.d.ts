import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUniqueConstraintToEmail1609809429986 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
