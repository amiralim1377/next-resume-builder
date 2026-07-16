/*
  Warnings:

  - You are about to drop the column `experience` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "experience",
ADD COLUMN     "coursesAndCertifications" JSONB,
ADD COLUMN     "job" JSONB,
ADD COLUMN     "profileImage" TEXT;
