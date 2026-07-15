/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "shortId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resume_shortId_key" ON "Resume"("shortId");

-- CreateIndex
CREATE INDEX "Resume_shortId_idx" ON "Resume"("shortId");
