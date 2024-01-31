-- CreateIndex
CREATE FULLTEXT INDEX `Product_Name_Description_idx` ON `Product`(`Name`, `Description`);
