-- AlterTable
ALTER TABLE "Conversations" ALTER COLUMN "model" SET DEFAULT 'gemini-1.5-flash',
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL;
