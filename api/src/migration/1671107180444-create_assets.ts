import {MigrationInterface, QueryRunner} from "typeorm";

export class createAssets1671107180444 implements MigrationInterface {
    name = 'createAssets1671107180444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset" ("id" SERIAL NOT NULL, "cTitle" character varying NOT NULL, "cStatus" character varying NOT NULL, "landType" character varying NOT NULL, "landArea" integer NOT NULL, "propertyType" character varying NOT NULL, "propertyArea" character varying NOT NULL, "beds" integer NOT NULL, "bedrooms" integer NOT NULL, "roomsTotal" integer NOT NULL, "kitchens" integer NOT NULL, "livingRooms" integer NOT NULL, "terraces" integer NOT NULL, "balconies" integer NOT NULL, "garages" integer NOT NULL, "bathRooms" integer NOT NULL, "occupation" character varying NOT NULL, "images" jsonb NOT NULL, "documents" jsonb NOT NULL, "averageCoCPercentage" integer NOT NULL, "projectedIrrPercentage" integer NOT NULL, "taxesPercentage" integer NOT NULL, "insurancePercentage" integer NOT NULL, "propertyManagementPercentage" integer NOT NULL, "utilitiesPercentage" integer NOT NULL, "llcAdministrationFeePercentage" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "asset"`);
    }

}
