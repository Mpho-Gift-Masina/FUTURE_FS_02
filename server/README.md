# Mini CRM Backend

> Express.js + MongoDB REST API powering the Mini CRM system.
> See the [root README](../README.md) for the full project overview.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template and fill in your values
cp .env.example .env

# Start in development mode (auto-reload)
npm run dev

# Start in production mode
npm start
```

## Environment Variables

Create a `.env` file in this (`server/`) directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default: `5000`) |
| `MONGO_URI` | MongoDB connection string (Atlas URI or `mongodb://localhost:27017/minicrm`) |
| `JWT_SECRET` | Secret key for signing JWTs — keep this private and random |

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start server with nodemon (auto-reload) |
| `start` | `npm start` | Start server with Node.js (production) |

## API

Full API documentation is in the [root README](../README.md#-api-endpoints).

