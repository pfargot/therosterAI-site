#!/bin/bash

echo "🚀 Roster.AI Production Setup Script"
echo "=================================="

# Generate JWT Secret
JWT_SECRET=$(openssl rand -base64 32)
echo "Generated JWT Secret: $JWT_SECRET"
echo ""

# Create production .env file
cat > backend/.env.production << EOF
# Production Environment Variables
NODE_ENV=production
PORT=5001

# Database (Replace with your production database URL)
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT Secret
JWT_SECRET="$JWT_SECRET"

# Frontend URL (Update with your deployed frontend URL)
FRONTEND_URL="https://roster-ai-app.vercel.app"

# Optional: OpenAI API Key for enhanced AI features
OPENAI_API_KEY="your-openai-api-key"

# Optional: Google Cloud Vision API for image analysis
GOOGLE_CLOUD_VISION_API_KEY="your-google-api-key"
EOF

echo "✅ Production environment file created: backend/.env.production"
echo ""
echo "📋 Next Steps:"
echo "1. Update DATABASE_URL with your production database"
echo "2. Set FRONTEND_URL to your deployed frontend URL"
echo "3. Add your API keys if using enhanced features"
echo "4. Deploy using one of the methods in DEPLOYMENT.md"
echo ""
echo "🔗 Quick Deploy Commands:"
echo "Vercel: vercel --prod"
echo "Railway: railway up"
echo "Heroku: git push heroku main" 