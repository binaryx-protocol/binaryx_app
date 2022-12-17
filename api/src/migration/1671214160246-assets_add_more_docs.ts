import {MigrationInterface, QueryRunner} from "typeorm";

export class assetsAddMoreDocs1671214160246 implements MigrationInterface {
    name = 'assetsAddMoreDocs1671214160246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "documents"`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "saleDocuments" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "agreementIntent" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "sellingAgreement" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "llcPropertyDocuments" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "ownershipAgreement" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "tokenizationAgreement" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "llcFormationDocument" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "notaryConclusion" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "managementDocuments" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "rentalAgreement" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "images" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ALTER COLUMN "images" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "rentalAgreement"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "managementDocuments"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "notaryConclusion"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "llcFormationDocument"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "tokenizationAgreement"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "ownershipAgreement"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "llcPropertyDocuments"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "sellingAgreement"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "agreementIntent"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "saleDocuments"`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "documents" jsonb NOT NULL`);
    }

}
