import { MigrationInterface, QueryRunner } from "typeorm";
export declare class initial1609800960000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
