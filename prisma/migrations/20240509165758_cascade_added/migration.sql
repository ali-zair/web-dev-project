-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SellerCookie" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "SellerCookie_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SellerCookie" ("cookie", "sellerId") SELECT "cookie", "sellerId" FROM "SellerCookie";
DROP TABLE "SellerCookie";
ALTER TABLE "new_SellerCookie" RENAME TO "SellerCookie";
CREATE TABLE "new_BankAccount" (
    "accountNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" DECIMAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "BankAccount_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BankAccount" ("accountNo", "balance", "sellerId") SELECT "accountNo", "balance", "sellerId" FROM "BankAccount";
DROP TABLE "BankAccount";
ALTER TABLE "new_BankAccount" RENAME TO "BankAccount";
CREATE TABLE "new_CustomerCookie" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "CustomerCookie_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CustomerCookie" ("cookie", "customerId") SELECT "cookie", "customerId" FROM "CustomerCookie";
DROP TABLE "CustomerCookie";
ALTER TABLE "new_CustomerCookie" RENAME TO "CustomerCookie";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "extra_details" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("extra_details", "features", "id", "note", "price", "quantity", "sellerId", "thumbnail", "title") SELECT "extra_details", "features", "id", "note", "price", "quantity", "sellerId", "thumbnail", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
