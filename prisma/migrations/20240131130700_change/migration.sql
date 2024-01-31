-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `phone` INTEGER NOT NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profile_picture` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `PublishDate` DATETIME(3) NOT NULL,
    `Author` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `Tag` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NOT NULL,
    `DownloadID` INTEGER NOT NULL,

    UNIQUE INDEX `Product_DownloadID_key`(`DownloadID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Download` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `IsPay` BOOLEAN NOT NULL DEFAULT false,
    `Customer_ID` INTEGER NOT NULL,
    `Product_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Method` VARCHAR(191) NOT NULL,
    `Status` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',
    `Cart_ID` INTEGER NOT NULL,
    `Customer_ID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Customer_ID` INTEGER NOT NULL,
    `Product_ID` INTEGER NOT NULL,
    `Payment_ID` INTEGER NOT NULL,
    `Download_ID` INTEGER NOT NULL,

    UNIQUE INDEX `Inventory_Payment_ID_key`(`Payment_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_DownloadID_fkey` FOREIGN KEY (`DownloadID`) REFERENCES `Download`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Cart_ID_fkey` FOREIGN KEY (`Cart_ID`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_Customer_ID_fkey` FOREIGN KEY (`Customer_ID`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_Payment_ID_fkey` FOREIGN KEY (`Payment_ID`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_Download_ID_fkey` FOREIGN KEY (`Download_ID`) REFERENCES `Download`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
