# AnswersAI Backend Service

## Prerequisites

- Node.js >= 18.0.0
- MongoDB
- Docker (optional)
- OpenAI API key or Anthropic API key

## Project Structure

```
/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Custom middleware (auth, validation)
│   ├── models/        # Database models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── tests/            # Test files
├── Dockerfile        # Docker configuration
└── docker-compose.yml # Docker compose config
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/answers-ai-backend.git
   cd answers-ai-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Users

- `POST /api/users` - Create new user
- `GET /api/users/:userId` - Get user profile
- `GET /api/users/:userId/questions` - Get user's questions

### Questions

- `POST /api/questions` - Submit a question
- `GET /api/questions/:questionId` - Get specific question and answer

## Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t answers-ai-backend .

# Run the container
docker run -p 3000:3000 answers-ai-backend
```

Or using docker-compose:

```bash
docker-compose up
```

## Testing

Run the test suite:

```bash
npm test
```

## Security Features

- JWT-based authentication
- Rate limiting
- Helmet security headers
- Password hashing with bcrypt
- Input validation and sanitization
