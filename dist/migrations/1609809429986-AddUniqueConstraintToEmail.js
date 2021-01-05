"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUniqueConstraintToEmail1609809429986 = void 0;
class AddUniqueConstraintToEmail1609809429986 {
    constructor() {
        this.name = 'AddUniqueConstraintToEmail1609809429986';
    }
    async up(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "dbo"."employees"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."employees" ADD CONSTRAINT "UQ_2b6faf175208908c9ab6d543714" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "dbo"."employees" DROP CONSTRAINT "UQ_2b6faf175208908c9ab6d543714"`);
        await queryRunner.query(`COMMENT ON COLUMN "dbo"."employees"."email" IS NULL`);
    }
}
exports.AddUniqueConstraintToEmail1609809429986 = AddUniqueConstraintToEmail1609809429986;
//# sourceMappingURL=1609809429986-AddUniqueConstraintToEmail.js.map