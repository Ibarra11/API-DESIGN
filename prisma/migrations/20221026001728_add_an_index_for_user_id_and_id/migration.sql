-- DropIndex
DROP INDEX "Product_id_userId_key";

-- CreateIndex
CREATE INDEX "Product_id_userId_idx" ON "Product"("id", "userId");
