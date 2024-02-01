-- AlterTable
ALTER TABLE "link" RENAME CONSTRAINT "links_pkey" TO "link_pkey";

-- RenameIndex
ALTER INDEX "links_slug_key" RENAME TO "link_slug_key";
