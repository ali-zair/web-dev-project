/*
  Warnings:

  - You are about to drop the column `bankAccountNo` on the `Seller` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Seller" ("company", "id", "password", "username") SELECT "company", "id", "password", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
