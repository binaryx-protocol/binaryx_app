import {MigrationInterface, QueryRunner} from "typeorm";

export class createKycHooks1670754357875 implements MigrationInterface {
    name = 'createKycHooks1670754357875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hook" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "isStoredInBlockchain" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4fae52db3090a56452a9c93e0ed" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hook"`);
    }

}
