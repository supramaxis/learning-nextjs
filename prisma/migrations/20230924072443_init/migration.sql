/*
  Warnings:

  - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey",
ALTER COLUMN "id" SET DEFAULT prefix_uuid('link_'::text),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "url_id_seq";
