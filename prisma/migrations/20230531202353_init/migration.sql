-- CreateTable
CREATE TABLE "funding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "program" TEXT,
    "call" TEXT,
    "supportType" TEXT NOT NULL,
    "requiresPartner" TEXT NOT NULL,
    "TRLmin" TEXT NOT NULL,
    "TRLmax" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "minValue" TEXT NOT NULL,
    "maxValue" TEXT NOT NULL,
    "supportTax" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "tax" TEXT NOT NULL,
    "shortage" TEXT NOT NULL,
    "amortization" TEXT NOT NULL,
    "isESG" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastRelease" TEXT NOT NULL,
    "objective" TEXT,
    "elegibility" TEXT,
    "expenses" TEXT,
    "observation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT,

    CONSTRAINT "PartnerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fundingId" TEXT,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funding_key_key" ON "funding"("key");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerType" ADD CONSTRAINT "PartnerType_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "funding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
