/*
  Warnings:

  - Added the required column `result` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webhook" ADD COLUMN     "result" BOOLEAN NOT NULL,
ADD COLUMN     "result_message" TEXT;
