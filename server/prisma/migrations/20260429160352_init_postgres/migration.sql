-- CreateEnum
CREATE TYPE "MovieType" AS ENUM ('MOVIE', 'SERIES');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "type" "MovieType" NOT NULL DEFAULT 'MOVIE',
    "posterUrl" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "lived" BOOLEAN,
    "photoUrl" TEXT,
    "bio" TEXT,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieActors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieActors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_key" ON "Movie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");

-- CreateIndex
CREATE INDEX "_MovieActors_B_index" ON "_MovieActors"("B");

-- AddForeignKey
ALTER TABLE "_MovieActors" ADD CONSTRAINT "_MovieActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieActors" ADD CONSTRAINT "_MovieActors_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
