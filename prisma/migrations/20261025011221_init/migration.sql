-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "subjects" TEXT NOT NULL,
    "levels" TEXT NOT NULL,
    "educationStage" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL DEFAULT 0,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "cvUrl" TEXT,
    "availability" TEXT NOT NULL DEFAULT 'Immediate',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contactPerson" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schoolId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "educationStage" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "requirements" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vacancy_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schoolName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "reference" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CollectedRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "source" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "scrapedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
