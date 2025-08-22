# Roster.AI - Dating Evaluation Platform

A comprehensive dating evaluation platform that helps users build and analyze their dating roster through intelligent insights and detailed evaluations.

## 🚀 Features

### Core Functionality
- **Date Evaluation**: Comprehensive forms to evaluate dates with qualitative and quantitative metrics
- **Roster Management**: Build and manage your dating prospects
- **AI Insights**: Get intelligent analysis and dating advice
- **Cross-Platform**: iOS, Android, and Web applications

### Evaluation Fields
- **Core Debrief**: Date number, location, duration, vibe check
- **Ratings**: Chemistry (1-10), attraction (1-10)
- **Flags**: Green flags and red flags tracking
- **Emotional Intelligence**: How they made you feel, conversation quality
- **Behavioral Analysis**: Power dynamics, effort level, body language
- **Custom Tags**: Add your own evaluation criteria

### Integrations
- **Dating Apps**: Tinder, Bumble, Hinge integration
- **Image Analysis**: AI-powered photo evaluation
- **Social Features**: Share insights with friends (optional)

## 🛠 Tech Stack

- **Frontend**: React Native (mobile) + React (web)
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Auth0/Firebase Auth
- **AI Services**: OpenAI GPT, Google Cloud Vision
- **Deployment**: Vercel (web) + Expo EAS (mobile)

## 📁 Project Structure

```
roster-ai-app/
├── backend/           # Node.js API server
├── frontend/          # React web application
├── mobile/            # React Native mobile app
├── shared/            # Shared types and utilities
├── docs/              # Documentation
└── scripts/           # Build and deployment scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL
- Expo CLI (for mobile development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roster-ai-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   npm run setup:db
   ```

5. **Start development servers**
   ```bash
   # Start backend and frontend
   npm run dev
   
   # Start mobile development
   npm run dev:mobile
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/roster_ai"

# Authentication
AUTH0_DOMAIN="your-auth0-domain"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"

# AI Services
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_CLOUD_VISION_API_KEY="your-google-vision-api-key"

# Dating App Integrations
TINDER_API_KEY="your-tinder-api-key"
BUMBLE_API_KEY="your-bumble-api-key"
HINGE_API_KEY="your-hinge-api-key"

# File Storage
AWS_S3_BUCKET="your-s3-bucket"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
```

## 📱 Mobile Development

### iOS
```bash
cd mobile
npx expo run:ios
```

### Android
```bash
cd mobile
npx expo run:android
```

## 🌐 Web Development

```bash
cd frontend
npm start
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend
```

## 📦 Deployment

### Web App (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Mobile Apps (Expo EAS)
```bash
cd mobile
npx eas build --platform ios
npx eas build --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@roster.ai or join our Discord community.

## 🔮 Roadmap

- [ ] Dating app API integrations
- [ ] Advanced AI insights
- [ ] Social features
- [ ] Premium subscription model
- [ ] Analytics dashboard
- [ ] Relationship coaching 