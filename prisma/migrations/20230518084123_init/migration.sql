/*
  Warnings:

  - You are about to drop the column `customcode` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customCode]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Url_customcode_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "customcode",
DROP COLUMN "url",
ADD COLUMN     "customCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Url_customCode_key" ON "Url"("customCode");
