# 🚀 Deploy Roster.AI to Vercel

## ✅ **Your Database URL (Ready to Use)**
```
postgresql://postgres.llaezdqudvtkmdfltklh:sYtzuf-jyjkyh-4ruxqa@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

## 📋 **Step-by-Step Deployment**

### **Step 1: Go to Vercel Dashboard**
1. **Open [vercel.com](https://vercel.com)**
2. **Sign in with:** `pablofargote@gmail.com`
3. **Click "New Project"**

### **Step 2: Import Repository**
1. **Select "Import Git Repository"**
2. **Find and select:** `therosterAI-site`
3. **Click "Import"**

### **Step 3: Configure Project Settings**
- **Framework Preset:** `Other`
- **Root Directory:** `./` (leave default)
- **Build Command:** `npm run build`
- **Output Directory:** `frontend/build`
- **Install Command:** `npm install`

### **Step 4: Add Environment Variables**
Click "Environment Variables" and add these:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://postgres.llaezdqudvtkmdfltklh:sYtzuf-jyjkyh-4ruxqa@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://[your-project-name].vercel.app` |
| `REACT_APP_BACKEND_URL` | `https://[your-project-name].vercel.app` |

### **Step 5: Deploy**
1. **Click "Deploy"**
2. **Wait for build to complete** (2-3 minutes)
3. **Your app will be live at:** `https://[project-name].vercel.app`

## 🔧 **If You Get Build Errors**

If the build fails, try these settings instead:
- **Build Command:** `cd frontend && npm install && npm run build`
- **Output Directory:** `frontend/build`
- **Install Command:** `npm install && cd backend && npm install`

## 🎉 **Success!**
Your Roster.AI app will be publicly accessible at your Vercel URL! 