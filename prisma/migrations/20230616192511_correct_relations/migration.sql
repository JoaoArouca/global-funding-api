/*
  Warnings:

  - You are about to drop the column `fundingId` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `fundingId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `fundingId` on the `PartnerType` table. All the data in the column will be lost.
  - You are about to drop the column `fundingId` on the `Region` table. All the data in the column will be lost.
  - You are about to drop the column `fundingId` on the `Sector` table. All the data in the column will be lost.
  - You are about to drop the column `fundingId` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the column `userFundingReviewerId` on the `funding` table. All the data in the column will be lost.
  - You are about to drop the `userFundingResponsible` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `preUserId` on table `funding` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "PartnerType" DROP CONSTRAINT "PartnerType_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "Sector" DROP CONSTRAINT "Sector_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "funding" DROP CONSTRAINT "funding_preUserId_fkey";

-- DropForeignKey
ALTER TABLE "funding" DROP CONSTRAINT "funding_userFundingReviewerId_fkey";

-- DropForeignKey
ALTER TABLE "userFundingResponsible" DROP CONSTRAINT "userFundingResponsible_fundingId_fkey";

-- DropForeignKey
ALTER TABLE "userFundingResponsible" DROP CONSTRAINT "userFundingResponsible_preUserId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "PartnerType" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "Sector" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "fundingId";

-- AlterTable
ALTER TABLE "funding" DROP COLUMN "userFundingReviewerId",
ADD COLUMN     "userFundingReviewer_id" TEXT,
ALTER COLUMN "preUserId" SET NOT NULL;

-- DropTable
DROP TABLE "userFundingResponsible";

-- CreateTable
CREATE TABLE "_CountryTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RegionTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SectorTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PartnerTypeTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TechnologyTofunding" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CountryTofunding_AB_unique" ON "_CountryTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryTofunding_B_index" ON "_CountryTofunding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RegionTofunding_AB_unique" ON "_RegionTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_RegionTofunding_B_index" ON "_RegionTofunding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationTofunding_AB_unique" ON "_OrganizationTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationTofunding_B_index" ON "_OrganizationTofunding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SectorTofunding_AB_unique" ON "_SectorTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_SectorTofunding_B_index" ON "_SectorTofunding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PartnerTypeTofunding_AB_unique" ON "_PartnerTypeTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_PartnerTypeTofunding_B_index" ON "_PartnerTypeTofunding"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TechnologyTofunding_AB_unique" ON "_TechnologyTofunding"("A", "B");

-- CreateIndex
CREATE INDEX "_TechnologyTofunding_B_index" ON "_TechnologyTofunding"("B");

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_preUserId_fkey" FOREIGN KEY ("preUserId") REFERENCES "preusers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_userFundingReviewer_id_fkey" FOREIGN KEY ("userFundingReviewer_id") REFERENCES "userFundingReviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryTofunding" ADD CONSTRAINT "_CountryTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryTofunding" ADD CONSTRAINT "_CountryTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegionTofunding" ADD CONSTRAINT "_RegionTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegionTofunding" ADD CONSTRAINT "_RegionTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationTofunding" ADD CONSTRAINT "_OrganizationTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationTofunding" ADD CONSTRAINT "_OrganizationTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorTofunding" ADD CONSTRAINT "_SectorTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorTofunding" ADD CONSTRAINT "_SectorTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerTypeTofunding" ADD CONSTRAINT "_PartnerTypeTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "PartnerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartnerTypeTofunding" ADD CONSTRAINT "_PartnerTypeTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechnologyTofunding" ADD CONSTRAINT "_TechnologyTofunding_A_fkey" FOREIGN KEY ("A") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechnologyTofunding" ADD CONSTRAINT "_TechnologyTofunding_B_fkey" FOREIGN KEY ("B") REFERENCES "funding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
