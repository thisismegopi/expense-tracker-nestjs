import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699150549677 implements MigrationInterface {
    name = 'Init1699150549677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expensetracker"."transaction" ("transaction_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_type" character varying NOT NULL, "amount" numeric NOT NULL, "note" character varying, "date_time" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "categoryCategoryId" uuid, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "expensetracker"."category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "category_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cc7f32b7ab33c70b9e715afae84" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5707c78a98fb44dfa76192435a" ON "expensetracker"."category" ("category_type") `);
        await queryRunner.query(`ALTER TABLE "expensetracker"."transaction" ADD CONSTRAINT "FK_1e057e7b643f8e6e801835c1707" FOREIGN KEY ("categoryCategoryId") REFERENCES "expensetracker"."category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expensetracker"."transaction" DROP CONSTRAINT "FK_1e057e7b643f8e6e801835c1707"`);
        await queryRunner.query(`DROP INDEX "expensetracker"."IDX_5707c78a98fb44dfa76192435a"`);
        await queryRunner.query(`DROP TABLE "expensetracker"."category"`);
        await queryRunner.query(`DROP TABLE "expensetracker"."transaction"`);
    }

}
