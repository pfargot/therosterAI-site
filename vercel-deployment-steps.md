# 🚀 Vercel Deployment Steps

## Step 1: Go to Vercel Dashboard

1. **Open [vercel.com](https://vercel.com)**
2. **Sign in with:** `pablofargote@gmail.com`
3. **Click "New Project"**

## Step 2: Import Repository

1. **Select "Import Git Repository"**
2. **Find and select:** `therosterAI-site`
3. **Click "Import"**

## Step 3: Configure Project Settings

**Framework Preset:** `Other`
**Root Directory:** `./` (leave default)
**Build Command:** `npm run build`
**Output Directory:** `frontend/build`
**Install Command:** `npm install`

## Step 4: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `[Your Supabase URL from setup-database.md]` |
| `JWT_SECRET` | `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=` |
| `NODE_ENV` | `production` |

## Step 5: Deploy

1. **Click "Deploy"**
2. **Wait for build to complete** (2-3 minutes)
3. **Your app will be live at:** `https://[project-name].vercel.app`

## Step 6: Update Frontend URL

After deployment, go back to Environment Variables and add:
- `FRONTEND_URL`: `https://[your-vercel-url].vercel.app` 