"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial1609800960000 = void 0;
class initial1609800960000 {
    constructor() {
        this.name = 'initial1609800960000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "dbo"."employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isactive" boolean NOT NULL DEFAULT true, "firstname" character varying(300) NOT NULL, "lastname" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, CONSTRAINT "PK_6354132ccf58347fa5c9b3a6fc7" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "dbo"."employees"`);
    }
}
exports.initial1609800960000 = initial1609800960000;
//# sourceMappingURL=1609800960000-initial.js.map