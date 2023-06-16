-- AlterTable
ALTER TABLE "funding" ADD COLUMN     "preUserId" TEXT,
ADD COLUMN     "userFundingReviewerId" TEXT;

-- CreateTable
CREATE TABLE "preusers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isReviewer" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "preusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFundingResponsible" (
    "id" TEXT NOT NULL,
    "preUserId" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,

    CONSTRAINT "userFundingResponsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFundingReviewer" (
    "id" TEXT NOT NULL,
    "preUserId" TEXT NOT NULL,

    CONSTRAINT "userFundingReviewer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "preusers_email_key" ON "preusers"("email");

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_preUserId_fkey" FOREIGN KEY ("preUserId") REFERENCES "preusers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funding" ADD CONSTRAINT "funding_userFundingReviewerId_fkey" FOREIGN KEY ("userFundingReviewerId") REFERENCES "userFundingReviewer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFundingResponsible" ADD CONSTRAINT "userFundingResponsible_preUserId_fkey" FOREIGN KEY ("preUserId") REFERENCES "preusers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFundingResponsible" ADD CONSTRAINT "userFundingResponsible_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFundingReviewer" ADD CONSTRAINT "userFundingReviewer_preUserId_fkey" FOREIGN KEY ("preUserId") REFERENCES "preusers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
