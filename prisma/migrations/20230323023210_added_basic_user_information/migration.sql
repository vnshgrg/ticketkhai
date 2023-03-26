-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'doNotDisclose');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "firstNameKana" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastNameKana" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "password" TEXT;
