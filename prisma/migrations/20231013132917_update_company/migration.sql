/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cep` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyAddress" DROP CONSTRAINT "CompanyAddress_addressId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyAddress" DROP CONSTRAINT "CompanyAddress_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "CompanyAddress";
