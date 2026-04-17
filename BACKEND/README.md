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

## Contact Form Email Handler

The CRM landing page includes a contact form that sends messages to the project owner through the backend.

### How it works
- The React frontend sends contact form data to the backend API
- The Express backend handles the request
- Nodemailer sends the email using Gmail SMTP

### Environment variables
Create a `.env` file inside `BACKEND/` and add:

```env
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_character_google_app_password
CONTACT_RECEIVER=yourgmail@gmail.com

```md
## Email Contact Endpoint

### Endpoint
`POST /api/contact`

### Request body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I want to know more about your CRM."
}
##  Stage your changes

From the root of the repo:

```bash
git add .

