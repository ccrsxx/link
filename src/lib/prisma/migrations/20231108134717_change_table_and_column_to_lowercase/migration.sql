-- AlterTable
ALTER TABLE "Link" RENAME TO "links";

-- AlterTable
ALTER TABLE "links" RENAME COLUMN "createdAt" TO "created_at";
