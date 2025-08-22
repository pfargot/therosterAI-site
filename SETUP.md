# Roster.AI Setup Guide

This guide will help you set up the complete Roster.AI dating evaluation platform on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v13 or higher)
- **Git**
- **Expo CLI** (for mobile development)

### Installing Prerequisites

#### Node.js and npm
```bash
# Download from https://nodejs.org/
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### PostgreSQL
```bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

#### Expo CLI
```bash
npm install -g @expo/cli
```

## Project Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd roster-ai-app

# Install all dependencies
npm run install:all
```

### 2. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE roster_ai;
CREATE USER roster_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE roster_ai TO roster_user;
\q

# Set up environment variables
cp env.example .env
# Edit .env with your database credentials
```

### 3. Environment Configuration

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://roster_user:your_password@localhost:5432/roster_ai"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# AI Services (optional for initial setup)
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_CLOUD_VISION_API_KEY="your-google-vision-api-key"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

### 4. Database Migration

```bash
# Set up the database schema
npm run setup:db
```

### 5. Start Development Servers

```bash
# Start backend and frontend together
npm run dev

# Or start them separately:
npm run dev:backend  # Backend on http://localhost:5000
npm run dev:frontend # Frontend on http://localhost:3000
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### User Endpoints

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/me/stats` - Get user statistics

### Profile Endpoints

- `GET /api/profiles` - Get all profiles
- `POST /api/profiles` - Create new profile
- `GET /api/profiles/:id` - Get specific profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

### Date Endpoints

- `GET /api/dates` - Get all dates
- `POST /api/dates` - Create new date
- `GET /api/dates/:id` - Get specific date
- `PUT /api/dates/:id` - Update date
- `DELETE /api/dates/:id` - Delete date

### Evaluation Endpoints

- `GET /api/evaluations` - Get all evaluations
- `POST /api/evaluations` - Create new evaluation
- `GET /api/evaluations/:id` - Get specific evaluation
- `PUT /api/evaluations/:id` - Update evaluation
- `DELETE /api/evaluations/:id` - Delete evaluation

### AI Endpoints

- `POST /api/ai/analyze-image` - Analyze profile image
- `POST /api/ai/advice` - Generate dating advice
- `POST /api/ai/insights` - Generate insights

## Mobile Development

### iOS Development

```bash
cd mobile
npm start
# Press 'i' to open iOS simulator
```

### Android Development

```bash
cd mobile
npm start
# Press 'a' to open Android emulator
```

### Building for Production

```bash
# iOS
cd mobile
npx expo build:ios

# Android
cd mobile
npx expo build:android
```

## Testing

```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend
```

## Deployment

### Backend Deployment (Heroku)

```bash
# Create Heroku app
heroku create roster-ai-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-jwt-secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Mobile App Deployment

```bash
# Build for app stores
cd mobile
npx expo build:ios --release-channel production
npx expo build:android --release-channel production
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change ports in package.json scripts
   - Kill processes using the ports

3. **Mobile App Won't Start**
   - Clear Expo cache: `expo r -c`
   - Check Expo CLI version
   - Verify all dependencies are installed

4. **Authentication Issues**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Check CORS settings

### Getting Help

- Check the logs in each terminal window
- Review the README.md for more details
- Check the API documentation
- Review the database schema in `backend/prisma/schema.prisma`

## Next Steps

1. **Customize the UI**: Modify the theme colors and styling
2. **Add Features**: Implement additional evaluation fields
3. **Integrate AI**: Add OpenAI and Google Cloud Vision APIs
4. **Add Dating App Integrations**: Implement Tinder, Bumble, Hinge APIs
5. **Add Analytics**: Implement user analytics and insights
6. **Add Premium Features**: Implement subscription model
7. **Add Social Features**: Implement sharing and friend connections

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License. 