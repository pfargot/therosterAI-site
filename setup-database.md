# 🗄️ Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign in with:** `pablofargote@gmail.com`
3. **Click "New Project"**
4. **Project Name:** `roster-ai-db`
5. **Database Password:** Create a strong password (save this!)
6. **Region:** Choose closest to you (US East, US West, etc.)
7. **Click "Create new project"**

## Step 2: Get Database URL

1. **Wait for project to finish setting up** (2-3 minutes)
2. **Go to Settings > Database**
3. **Copy the "Connection string" (URI format)**
4. **It looks like:** `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 3: Update Environment Variables

Use this URL in your Vercel environment variables as `DATABASE_URL`

## Step 4: Run Database Migration

After deployment, the database will be automatically set up with the Prisma schema. 