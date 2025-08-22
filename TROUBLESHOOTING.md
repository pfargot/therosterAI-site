# 🔧 **Roster.AI MVP Launch Troubleshooting Guide**

## ✅ **Pre-Launch Checklist**

### **1. Code Issues Fixed**
- ✅ ESLint error in frontend (useEffect dependency)
- ✅ Backend URL configuration for production
- ✅ Vercel configuration (distDir path)
- ✅ Removed proxy from frontend package.json
- ✅ Removed duplicate App.tsx file
- ✅ Updated Prisma schema for PostgreSQL

### **2. Environment Variables (Vercel)**
Make sure these are set in Vercel:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.llaezdqudvtkmdfltklh:sYtzuf-jyjkyh-4ruxqa@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=` |
| `NODE_ENV` | `production` |
| `REACT_APP_BACKEND_URL` | `https://[your-project-name].vercel.app` |

### **3. Database Setup (Supabase)**
1. **Verify Database Connection:**
   - Go to Supabase Dashboard
   - Check if database is active
   - Verify connection string is correct

2. **Run Database Migrations:**
   ```bash
   # In Vercel deployment, this should happen automatically
   # But you can manually trigger it if needed
   ```

### **4. Common Build Errors & Solutions**

#### **Error: "Cannot find module"**
- **Solution:** Check if all dependencies are in package.json
- **Action:** Run `npm install` in both frontend and backend

#### **Error: "Build failed"**
- **Solution:** Check Vercel build logs
- **Action:** Verify build commands are correct

#### **Error: "Database connection failed"**
- **Solution:** Check DATABASE_URL environment variable
- **Action:** Verify Supabase database is running

#### **Error: "CORS error"**
- **Solution:** Check FRONTEND_URL environment variable
- **Action:** Ensure it matches your Vercel app URL

### **5. Vercel Deployment Steps**

1. **Import Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import `therosterAI-site`

2. **Configure Build Settings:**
   - Framework: `Other`
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm install`

3. **Add Environment Variables:**
   - Add all 4 variables listed above

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### **6. Post-Deployment Verification**

#### **Frontend Tests:**
- ✅ App loads without errors
- ✅ Registration form works
- ✅ Login form works
- ✅ Can add dates to roster
- ✅ Can view AI insights

#### **Backend Tests:**
- ✅ Health check endpoint: `/health`
- ✅ Authentication endpoints: `/api/auth/register`, `/api/auth/login`
- ✅ Date management: `/api/dates`
- ✅ AI insights: `/api/ai/insights`

### **7. Monitoring & Debugging**

#### **Vercel Logs:**
- Check Function Logs for backend errors
- Check Build Logs for build issues
- Check Runtime Logs for runtime errors

#### **Supabase Logs:**
- Check Database Logs for connection issues
- Check API Logs for query errors

### **8. Emergency Rollback**

If deployment fails:
1. **Revert to previous commit:**
   ```bash
   git revert HEAD
   git push
   ```

2. **Check previous working version:**
   - Go to Vercel deployment history
   - Redeploy from a working commit

### **9. Performance Optimization**

#### **Frontend:**
- Enable Vercel Edge Caching
- Optimize images
- Enable compression

#### **Backend:**
- Enable Vercel Function Caching
- Optimize database queries
- Enable connection pooling

### **10. Security Checklist**

- ✅ JWT_SECRET is set and secure
- ✅ CORS is properly configured
- ✅ Environment variables are not exposed
- ✅ Database connection uses SSL
- ✅ API endpoints are protected

## 🚨 **If Still Having Issues**

1. **Check Vercel Build Logs** - Look for specific error messages
2. **Check Supabase Dashboard** - Verify database status
3. **Test Locally** - Ensure app works in development
4. **Check GitHub** - Verify all changes are pushed

## 📞 **Support**

If you encounter issues not covered here:
1. Check Vercel documentation
2. Check Supabase documentation
3. Review the deployment logs for specific error messages

**Your Roster.AI MVP should launch successfully with these fixes!** 🎉 