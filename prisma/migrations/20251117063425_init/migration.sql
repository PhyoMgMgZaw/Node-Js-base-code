/*
  Warnings:

  - Added the required column `password` to the `Developer` table without a default value. This is not possible if the table is not empty.
  - Made the column `team` on table `Developer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Developer` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `team` VARCHAR(191) NOT NULL;
