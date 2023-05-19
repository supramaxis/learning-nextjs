/*
  Warnings:

  - A unique constraint covering the columns `[customcode]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "customcode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Url_customcode_key" ON "Url"("customcode");
