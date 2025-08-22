# 🚀 Roster.AI Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest & Free)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - `DATABASE_URL`: Your database connection string
   - `JWT_SECRET`: A secure random string for JWT tokens

### Option 2: Railway (Alternative - Easy & Free)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

### Option 3: Heroku (Traditional - Paid)

1. **Install Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   ```

2. **Create Heroku App:**
   ```bash
   heroku create roster-ai-app
   ```

3. **Add PostgreSQL:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## Database Setup for Production

### Option A: Supabase (Recommended - Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Update `DATABASE_URL` in environment variables

### Option B: PlanetScale (Alternative)
1. Go to [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string
4. Update `DATABASE_URL`

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-database-connection-string"

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Optional: OpenAI API Key for enhanced AI features
OPENAI_API_KEY="your-openai-api-key"

# Optional: Google Cloud Vision API for image analysis
GOOGLE_CLOUD_VISION_API_KEY="your-google-api-key"
```

## Production Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Update CORS settings for production domain
- [ ] Set up image upload storage (AWS S3, Cloudinary, etc.)
- [ ] Configure SSL certificates
- [ ] Set up monitoring and logging
- [ ] Test all features in production environment

## Security Considerations

1. **Use HTTPS only** in production
2. **Set secure JWT secret** (32+ characters)
3. **Configure CORS** for your domain only
4. **Use environment variables** for all secrets
5. **Enable rate limiting** for API endpoints
6. **Set up proper logging** for security monitoring

## Performance Optimization

1. **Enable compression** (gzip)
2. **Set up CDN** for static assets
3. **Optimize images** before upload
4. **Implement caching** strategies
5. **Use database indexes** for queries

## Monitoring & Analytics

1. **Set up error tracking** (Sentry)
2. **Configure uptime monitoring** (UptimeRobot)
3. **Add analytics** (Google Analytics, Mixpanel)
4. **Set up logging** (Winston, Bunyan)

## Mobile App Deployment

For the mobile app (future):
1. **Expo EAS Build** for iOS/Android
2. **App Store Connect** for iOS
3. **Google Play Console** for Android
4. **TestFlight/Internal Testing** for beta testing 