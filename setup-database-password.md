# 🔐 Set Up Your Database Password

## **Your Supabase Database URL:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.llaezdqudvtkmdfltklh.supabase.co:5432/postgres
```

## **How to Find Your Password:**

### **Step 1: Go to Supabase Dashboard**
1. **Open [supabase.com](https://supabase.com)**
2. **Sign in with:** `pablofargote@gmail.com`
3. **Click on your project:** `roster-ai-db`

### **Step 2: Find Your Password**
1. **In the left sidebar, click "Settings"** (gear icon)
2. **Click "Database"**
3. **Look for "Database password"** - this is your password
4. **Copy the password**

### **Step 3: Use in Vercel**
When setting up environment variables in Vercel, replace `[YOUR-PASSWORD]` with your actual password:

**Example:**
- If your password is `mypassword123`
- Use: `postgresql://postgres:mypassword123@db.llaezdqudvtkmdfltklh.supabase.co:5432/postgres`

## **⚠️ Security Note:**
- Keep your password secure
- Don't share it publicly
- The password is only used for database connection 