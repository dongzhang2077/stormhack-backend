# StormHack Backend API

A nutrition and health guidance API that provides food pairing recommendations, disease-specific dietary advice, voice transcription, and AI-powered chat capabilities.

## 🚀 Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **External API**: OpenAI
- **Deployment**: Railway

## 📋 Features

1. **Disease Management** - Get information about chronic and acute health conditions
2. **Ingredient Search** - Search and autocomplete for food ingredients
3. **Food Compatibility** - Discover beneficial and harmful food pairings
4. **Disease-Specific Guidance** - Get personalized dietary recommendations
5. **Voice Transcription** - Convert audio to text for hands-free queries
6. **AI Chat Integration** - Direct access to GPT models for nutrition advice

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- OpenAI API key

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd stormhack-backend
```

2. Install dependencies

```bash
npm install
```
3. Configure environment variables

```bash
cp .env.example .env
```

Edit .env with your credentials:
envDATABASE_URL="postgresql://user:password@host:5432/dbname"
OPENAI_API_KEY="sk-..."
PORT=3000

4. Setup database

```bash
# Sync schema to database
npx prisma db push

# Seed initial data
npx prisma db seed
```

5. Run development server

```bash
npm run dev
```

Server will start at http://localhost:3000
📚 API Endpoints
## Core Endpoints

GET /api/health - Health check
GET /api/diseases - Get all diseases
GET /api/ingredients/search?q={query} - Search ingredients
GET /api/ingredients/{name}/compatibility - Get food pairings
POST /api/diseases/guide - Get disease dietary guide
POST /api/voice/transcribe - Transcribe audio to text
POST /api/ai/chat - Chat with GPT models

## Full API documentation: API_DOCUMENTATION.md
🗄️ Database Schema
Models

Ingredient - Food items with categories
Disease - Health conditions (chronic/acute)
IngredientInteraction - Foods to avoid together
IngredientBenefit - Beneficial food pairings
DiseaseIngredient - Disease-specific food relationships
Source - Scientific citations for all relationships

Sample Data

18 ingredients across multiple categories
14 diseases (7 chronic, 7 acute)
20+ food pairings with scientific sources
20+ disease-food relationships

## 🧪 Testing
Test endpoints with cURL:

```bash
# Health check
curl http://localhost:3000/api/health

# Search for milk
curl "http://localhost:3000/api/ingredients/search?q=milk"

# Get diabetes guide
curl -X POST http://localhost:3000/api/diseases/guide \
  -H "Content-Type: application/json" \
  -d '{"diseases": ["diabetes"]}'

# AI Chat
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What foods help with diabetes?"}]}'

```
Or use Prisma Studio:
```bash
npx prisma studio
```
## 🚀 Deployment
Railway Deployment

Install Railway CLI

```bash
npm install -g @railway/cli
```

### Login and deploy

```bash
railway login
railway init
railway up
```

Add environment variables in Railway dashboard:

```
DATABASE_URL
OPENAI_API_KEY
```

Run migrations

```bash
railway run npx prisma db push
railway run npx prisma db :seed
```
Production URL: https://stormhack-backend-production.up.railway.app

📖 Usage Examples
JavaScript/React Native
```javascript
const API_URL = "http://localhost:3000";

// Get disease guide
const response = await fetch(`${API_URL}/api/diseases/guide`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ diseases: ["diabetes"] })
});
const data = await response.json();

// AI Chat
const chatResponse = await fetch(`${API_URL}/api/ai/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "user", content: "What should I eat for breakfast?" }
    ]
  })
});
const aiData = await chatResponse.json();
console.log(aiData.message);

```
# 📝 Project Structure
```
stormhack-backend/
├── src/
│   ├── routes/
│   │   ├── health.ts
│   │   ├── diseases.ts
│   │   ├── ingredients.ts
│   │   ├── voice.ts
│   │   └── ai.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── API_DOCUMENTATION.md
├── package.json
└── .env
```
# 🔒 Security

OpenAI API key stored server-side
Rate limiting on AI endpoints (100 req/15min)
Input validation on all endpoints
CORS enabled for frontend integration

# 📄 License
MIT
# 👥 Contributors
StormHack Team
# 🐛 Issues
Report issues on GitHub or contact the backend team.
# 🔄 Version
Current Version: 1.2.0
Changelog:

v1.2.0: Added AI Chat endpoint
v1.1.0: Added voice transcription
v1.0.0: Initial release
