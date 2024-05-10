-- CreateTable
CREATE TABLE "CustomerCookies" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "CustomerCookies_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SellerCookies" (
    "cookie" TEXT NOT NULL PRIMARY KEY,
    "sellerId" INTEGER NOT NULL,
    CONSTRAINT "SellerCookies_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
