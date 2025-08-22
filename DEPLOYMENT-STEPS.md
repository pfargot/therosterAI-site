# 🚀 Roster.AI Deployment Steps

## Step 1: Set Up Supabase Database

1. **Go to [supabase.com](https://supabase.com)** and sign in with `pablofargote@gmail.com`
2. **Create a new project** called "roster-ai-db"
3. **Get your database URL:**
   - Go to Settings > Database
   - Copy the "Connection string" (URI format)
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
git push -u origin main
```

## Step 3: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with `pablofargote@gmail.com`
2. **Click "New Project"**
3. **Import your GitHub repository:**
   - Select "therosterAI-site" from the list
   - Click "Import"
4. **Configure the project:**
   - Framework Preset: "Other"
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm install`
5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these variables:
     - `DATABASE_URL`: Your Supabase database URL
     - `JWT_SECRET`: `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=`
     - `FRONTEND_URL`: `https://therosterai-site.vercel.app`
6. **Click "Deploy"**

## Step 4: Set Up Database Schema

After deployment, you'll need to set up your database schema:

1. **Go to your Supabase project dashboard**
2. **Go to SQL Editor**
3. **Run this SQL to create the tables:**

```sql
-- Create Users table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create DateProfile table
CREATE TABLE "DateProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "bio" TEXT,
    "interests" TEXT,
    "datingApp" TEXT,
    "profileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    CONSTRAINT "DateProfile_pkey" PRIMARY KEY ("id")
);

-- Create DateEvaluation table
CREATE TABLE "DateEvaluation" (
    "id" TEXT NOT NULL,
    "dateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER NOT NULL,
    "notes" TEXT,
    "chemistryRating" INTEGER,
    "attractionRating" INTEGER,
    "vibeCheck" TEXT,
    "emotionalImpact" TEXT,
    "conversationQuality" TEXT,
    "effortLevel" TEXT,
    "bodyLanguage" TEXT,
    "profileImage" TEXT,
    "imageAnalysis" TEXT,
    "consistencyCheck" TEXT,
    "greenFlags" TEXT,
    "redFlags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    CONSTRAINT "DateEvaluation_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "DateProfile" ADD CONSTRAINT "DateProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DateEvaluation" ADD CONSTRAINT "DateEvaluation_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "DateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "DateEvaluation" ADD CONSTRAINT "DateEvaluation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create indexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "DateProfile_userId_idx" ON "DateProfile"("userId");
CREATE INDEX "DateEvaluation_userId_idx" ON "DateEvaluation"("userId");
CREATE INDEX "DateEvaluation_dateId_idx" ON "DateEvaluation"("dateId");
```

## Step 5: Update Vercel Configuration

After deployment, you may need to update the Vercel configuration:

1. **Go to your Vercel project dashboard**
2. **Go to Settings > Functions**
3. **Set the Node.js version to 18.x**
4. **Go to Settings > Domains**
5. **Your app will be available at:** `https://therosterai-site.vercel.app`

## Step 6: Test Your App

1. **Visit your deployed app**
2. **Test the registration/login functionality**
3. **Test adding dates and evaluations**
4. **Test the AI insights feature**

## Troubleshooting

If you encounter issues:

1. **Check Vercel logs** in the Functions tab
2. **Verify environment variables** are set correctly
3. **Check Supabase logs** for database connection issues
4. **Make sure the database schema** is created correctly

## Next Steps

After successful deployment:

1. **Set up a custom domain** (optional)
2. **Configure analytics** (Google Analytics, etc.)
3. **Set up monitoring** (Sentry, etc.)
4. **Add real AI integrations** (OpenAI, Google Cloud Vision)

Your app will be live at: **https://therosterai-site.vercel.app** 