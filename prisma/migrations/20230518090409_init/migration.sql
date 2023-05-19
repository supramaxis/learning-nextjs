/*
  Warnings:

  - Added the required column `url` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "shortUrl" DROP NOT NULL;
