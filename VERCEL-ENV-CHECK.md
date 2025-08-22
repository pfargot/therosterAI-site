# 🔧 **Vercel Environment Variables Check**

## **Required Environment Variables:**

Go to your Vercel dashboard → Project Settings → Environment Variables and verify these are set:

### **✅ Backend Variables:**
| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.llaezdqudvtkmdfltklh:sYtzuf-jyjkyh-4ruxqa@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `aNQ+X7vdfyq7jINmGjQLcLSUTMKywVa6ErAU9l1Rm5g=` |
| `NODE_ENV` | `production` |

### **✅ Frontend Variable:**
| Variable | Value |
|----------|-------|
| `REACT_APP_BACKEND_URL` | `https://theroster-ai-site.vercel.app` |

## **🔍 How to Check:**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Click "Settings"**
4. **Click "Environment Variables"**
5. **Verify all 4 variables are present**

## **⚠️ Common Issues:**

- **Missing `REACT_APP_BACKEND_URL`** - This causes the frontend to try to connect to localhost
- **Wrong `DATABASE_URL`** - Should be the Supabase pooler connection string
- **Missing `JWT_SECRET`** - Required for authentication

## **🔄 After Fixing:**

1. **Redeploy your app** in Vercel
2. **Test registration again**
3. **Check Vercel function logs** for any backend errors 