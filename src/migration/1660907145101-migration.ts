import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1660907145101 implements MigrationInterface {
    name = 'migration1660907145101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balances" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balances" ALTER COLUMN "description" SET NOT NULL`);
    }
}
