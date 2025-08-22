# 🚀 **Fresh Vercel Deployment Guide**

## **Step 1: Create New Vercel Project**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with your GitHub account (`pablofargote@gmail.com`)
3. **Click "New Project"**
4. **Import Git Repository:**
   - Select `therosterAI-site` from your GitHub repositories
   - Click "Import"

## **Step 2: Configure Project Settings**

When Vercel asks for configuration:

- **Framework Preset:** Select `Other`
- **Root Directory:** Leave as `/` (root)
- **Build Command:** `npm run build` (this will use the root package.json)
- **Output Directory:** `frontend/build`
- **Install Command:** `npm install`

## **Step 3: Add Environment Variables**

**Go to Project Settings → Environment Variables** and add these 4 variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.llaezdqudvtkmdfltklh:sYtzuf-jyjkyh-4ruxqa@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=` |
| `NODE_ENV` | `production` |
| `REACT_APP_BACKEND_URL` | `https://[your-project-name].vercel.app` |

**⚠️ Important:** Replace `[your-project-name]` with your actual Vercel project name (you'll see this after creating the project).

## **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build to complete** (should take 2-3 minutes)
3. **Test your app!**

## **Step 5: Verify Deployment**

After deployment, test these features:

1. **User Registration/Login**
2. **Add a date to your roster**
3. **Upload a profile image**
4. **View AI insights**

## **Expected Timeline:**
- **Setup:** 5 minutes
- **Build:** 2-3 minutes  
- **Testing:** 5 minutes
- **Total:** ~15 minutes to launch

## **Troubleshooting**

If you encounter issues:

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Ensure `REACT_APP_BACKEND_URL`** matches your Vercel app URL
4. **Check that the database is accessible**

## **Success Indicators**

✅ **Build completes without errors**
✅ **Frontend loads at your Vercel URL**
✅ **Backend API responds at `/api/health`**
✅ **User registration/login works**
✅ **Date evaluation features work**

---

**Your Roster.AI MVP is ready to launch!** 🎉 