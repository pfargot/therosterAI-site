#!/bin/bash

echo "🚀 Roster.AI Production Build Script"
echo "===================================="

# Kill any running processes
echo "📋 Stopping any running processes..."
killall -9 node 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Test backend build
echo "🔨 Testing backend build..."
cd backend
npm install
npx tsc --noEmit
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Follow setup-database.md to create Supabase database"
echo "2. Follow vercel-deployment-steps.md to deploy to Vercel"
echo "3. Your app will be live at: https://[project-name].vercel.app" 