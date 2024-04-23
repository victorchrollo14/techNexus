-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "readTime" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "normalAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT;
