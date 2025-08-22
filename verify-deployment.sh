#!/bin/bash

echo "🔍 Roster.AI MVP Deployment Verification"
echo "========================================"

# Check if all critical files exist
echo "📁 Checking critical files..."

critical_files=(
    "frontend/src/App.js"
    "frontend/src/index.tsx"
    "frontend/package.json"
    "backend/src/index.ts"
    "backend/package.json"
    "backend/prisma/schema.prisma"
    "vercel.json"
    "package.json"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing!"
        exit 1
    fi
done

# Check Prisma schema configuration
echo ""
echo "🗄️ Checking Prisma configuration..."
if grep -q "provider = \"postgresql\"" backend/prisma/schema.prisma; then
    echo "✅ Prisma configured for PostgreSQL"
else
    echo "❌ Prisma not configured for PostgreSQL!"
    exit 1
fi

# Check Vercel configuration
echo ""
echo "🚀 Checking Vercel configuration..."
if grep -q "frontend/build" vercel.json; then
    echo "✅ Vercel distDir configured correctly"
else
    echo "❌ Vercel distDir not configured correctly!"
    exit 1
fi

# Check frontend package.json
echo ""
echo "📦 Checking frontend dependencies..."
if ! grep -q "proxy" frontend/package.json; then
    echo "✅ Proxy removed from frontend package.json"
else
    echo "❌ Proxy still exists in frontend package.json!"
    exit 1
fi

# Check backend URL configuration
echo ""
echo "🔗 Checking backend URL configuration..."
if grep -q "BACKEND_URL" frontend/src/App.js; then
    echo "✅ Backend URL configuration exists"
else
    echo "❌ Backend URL configuration missing!"
    exit 1
fi

# Check ESLint fix
echo ""
echo "🔧 Checking ESLint fix..."
if grep -q "eslint-disable-next-line" frontend/src/App.js; then
    echo "✅ ESLint warning suppressed"
else
    echo "❌ ESLint warning not suppressed!"
    exit 1
fi

echo ""
echo "🎉 All verification checks passed!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Vercel and import therosterAI-site"
echo "2. Add the 4 environment variables:"
echo "   - DATABASE_URL"
echo "   - JWT_SECRET"
echo "   - NODE_ENV"
echo "   - REACT_APP_BACKEND_URL"
echo "3. Deploy!"
echo ""
echo "Your Roster.AI MVP is ready for launch! 🚀" 