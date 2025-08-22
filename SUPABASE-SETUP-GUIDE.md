# Supabase Setup Guide for Roster.AI

## 🚀 Complete Database Setup

This guide will help you set up Supabase for reliable data persistence in your Roster.AI application.

## 📋 Prerequisites

- ✅ Supabase account (you already have this)
- ✅ Your Supabase project URL and API keys

## 🔧 Step 1: Set Up Database Tables

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Database Setup Script**
   - Copy the contents of `supabase-setup.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

4. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see two tables: `users` and `dates`

## 🔑 Step 2: Get Your API Keys

1. **Go to Settings > API**
   - In your Supabase dashboard, click "Settings" (gear icon)
   - Click "API" in the sidebar

2. **Copy Your Credentials**
   - **Project URL**: Copy the "Project URL"
   - **Anon Key**: Copy the "anon public" key

## 🌐 Step 3: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your Roster.AI project

2. **Add Environment Variables**
   - Go to "Settings" > "Environment Variables"
   - Add these variables:

   ```
   SUPABASE_URL=your_project_url_here
   SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. **Redeploy Your Application**
   - Go to "Deployments"
   - Click "Redeploy" on your latest deployment

## 🧪 Step 4: Test the Setup

1. **Test User Registration**
   - Go to your app: https://theroster-ai-site.vercel.app
   - Register a new user
   - Check Supabase dashboard > Table Editor > users table

2. **Test Date Creation**
   - Add a new date to your roster
   - Check Supabase dashboard > Table Editor > dates table

3. **Test Data Persistence**
   - Refresh the page
   - Your dates should still be there!

## 🔍 Step 5: Monitor Your Data

1. **View Real-time Data**
   - Go to Supabase Dashboard > Table Editor
   - Click on "users" or "dates" table
   - You'll see all your data in real-time

2. **Check Logs**
   - Go to Supabase Dashboard > Logs
   - Monitor API calls and database operations

## 🛠️ Troubleshooting

### Issue: "Supabase credentials not found"
**Solution**: Make sure you've added the environment variables to Vercel and redeployed.

### Issue: "Table doesn't exist"
**Solution**: Run the SQL setup script again in Supabase SQL Editor.

### Issue: "Permission denied"
**Solution**: Check that RLS policies are properly set up in the SQL script.

### Issue: "Connection failed"
**Solution**: Verify your Supabase URL and API key are correct.

## 🎯 What You Get

With this setup, you now have:

✅ **Reliable Data Persistence** - Data survives server restarts
✅ **Real-time Updates** - Changes appear instantly
✅ **Scalable Database** - Handles thousands of users
✅ **Professional Security** - Row Level Security (RLS)
✅ **Backup & Recovery** - Automatic backups
✅ **Performance** - Optimized indexes and queries

## 🚀 Next Steps

1. **Test thoroughly** - Add users, dates, and verify persistence
2. **Monitor performance** - Check Supabase dashboard for usage
3. **Scale as needed** - Supabase handles growth automatically

## 📞 Support

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify environment variables are set correctly
3. Ensure the SQL script ran successfully

Your Roster.AI app now has enterprise-grade data persistence! 🎉 