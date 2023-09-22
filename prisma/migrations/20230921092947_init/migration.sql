/*
  Warnings:

  - You are about to drop the column `userId` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId,id]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_userId_fkey";

-- DropIndex
DROP INDEX "Url_userId_id_key";

-- AlterTable
CREATE SEQUENCE url_id_seq;
ALTER TABLE "Url" DROP COLUMN "userId",
ADD COLUMN     "externalId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('url_id_seq');
ALTER SEQUENCE url_id_seq OWNED BY "Url"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Url_externalId_id_key" ON "Url"("externalId", "id");

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "ClerkUser"("externalId") ON DELETE CASCADE ON UPDATE CASCADE;
