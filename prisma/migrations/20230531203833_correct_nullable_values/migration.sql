-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_fundingId_fkey";

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "fundingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
