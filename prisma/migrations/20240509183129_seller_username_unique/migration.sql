/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
