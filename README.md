# Backend — AI Shopping System

This folder contains the Express backend for the AI Shopping System. It exposes REST endpoints for authentication, product search (via SerpAPI + Gemini), product comparison, and wishlist management.

## Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder with these values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ai-shopping
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serp_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

3. Start the server

```bash
node server.js
# or for development
npx nodemon server.js
```

## Notable files

- `server.js` — Express app, CORS, session and route registration.
- `config/db.js` — Connects to MongoDB (reads `process.env.MONGO_URI`).
- `config/passport.js` — Google OAuth Passport strategy (uses `GOOGLE_CLIENT_ID`, etc.).
- `agents/` — AI orchestration (searchAgent, recommendationAgent, comparisonAgent).
- `services/serpApiService.js` — Calls SerpAPI, uses `process.env.SERP_API_KEY`.
- `services/geminiService.js` — Uses Google GenAI client with `process.env.GEMINI_API_KEY`.
- `controllers/` — Route handlers for auth, products, wishlist, comparison.

## APIs (examples)

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/google
- GET /api/auth/google/callback

- GET /api/products/search?q=keyword
- POST /api/comparison
- GET /api/wishlist
- POST /api/wishlist
- DELETE /api/wishlist/:id
- DELETE /api/wishlist

## Environment variable notes
- `MONGO_URI` must match what is used in `config/db.js`.
- `SERP_API_KEY` is required to access SerpAPI shopping results.
- `GEMINI_API_KEY` is required for Gemini-based keyword generation and AI tasks.

## Troubleshooting
- If the server crashes on startup, check that `MONGO_URI` is valid and MongoDB is reachable.
- If AI calls fail, ensure API keys are set and valid in your `.env`.
- To change CORS origins, edit the `allowedOrigins` array in `server.js`.

## License
See the project root README for license information.
