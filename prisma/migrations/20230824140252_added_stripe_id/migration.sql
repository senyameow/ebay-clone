/*
  Warnings:

  - Added the required column `stripe_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "stripe_id" TEXT NOT NULL;
