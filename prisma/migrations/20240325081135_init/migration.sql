-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "id" SET DEFAULT concat('link_', substring(md5(random()::text), 0, 10));
