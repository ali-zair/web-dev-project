/*
  Warnings:

  - You are about to drop the `CustomerCookies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellerCookies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomerCookies";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SellerCookies";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CustomerCookie" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "CustomerCookie_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SellerCookie" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "SellerCookie_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
