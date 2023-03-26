/*
  Warnings:

  - The required column `key` was added to the `VerificationRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `type` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('mobile', 'email');

-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "type" "IdentifierType" NOT NULL;
