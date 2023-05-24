/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Url_userId_shortUrl_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Url_userId_id_key" ON "Url"("userId", "id");
