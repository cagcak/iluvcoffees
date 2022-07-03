import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1656846147605 implements MigrationInterface {
  name = 'SchemaSync1656846147605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "brand" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "brand"`);
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "title" character varying NOT NULL`,
    );
  }
}
