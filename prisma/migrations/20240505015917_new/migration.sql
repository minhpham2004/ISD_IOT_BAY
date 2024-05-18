/*
  Warnings:

  - Added the required column `paymentCardName` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "paymentCardNumber" INTEGER NOT NULL,
    "paymentPassword" INTEGER NOT NULL,
    "paymentCardName" TEXT NOT NULL,
    "paymentAmount" REAL NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("createdAt", "id", "orderId", "paymentAmount", "paymentCardNumber", "paymentPassword", "updatedAt") SELECT "createdAt", "id", "orderId", "paymentAmount", "paymentCardNumber", "paymentPassword", "updatedAt" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
