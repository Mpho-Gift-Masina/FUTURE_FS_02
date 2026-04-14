<div align="center">

# 🧩 Mini CRM — Customer Relationship Management System

> A lightweight, RESTful CRM backend API built as part of the **Future Interns Full-Stack Web Development Internship — Task 2 (2026)**.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About the Project

**Mini CRM** is a RESTful backend API that gives small businesses and solo developers a straightforward customer relationship management solution. Built as part of the [Future Interns Full-Stack Web Development Internship 2026](https://futureinterns.com/full-stack-web-development-task-2-2026/), it demonstrates a complete, production-ready API pattern using Node.js, Express, MongoDB, and JSON Web Tokens.

The system allows anyone to submit a lead (e.g., via a public website contact form) while authenticated admins can view, track, and manage those leads through a simple sales pipeline:

> **New → Contacted → Converted**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Admin Authentication** | Secure JWT-based register & login for admin users |
| 📋 **Lead Capture** | Public endpoint to receive new leads (name, email, phone, source, message) |
| 🔍 **Lead Listing** | Retrieve all leads; filter by `status` via query parameter |
| 👁 **Lead Detail** | Fetch full details of a single lead by ID |
| 🔄 **Status Pipeline** | Move leads through `new → contacted → converted` stages |
| 📝 **Notes** | Append time-stamped notes to any lead for internal tracking |
| 🗑 **Delete Lead** | Permanently remove a lead from the system |
| 🔒 **Route Protection** | All admin-only operations are guarded by JWT middleware |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 5 |
| **Database** | MongoDB Atlas / Local MongoDB |
| **ODM** | Mongoose 9 |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` |
| **Configuration** | `dotenv` |
| **Dev Server** | `nodemon` |

---

## 📸 Screenshots

> _Screenshots or GIF recordings of the API in action (e.g., via Postman or a connected frontend) will be added here._

<!-- Example:
![Lead List Response](docs/screenshots/lead-list.png)
![Login Request](docs/screenshots/login.png)
-->

---

## ✅ Prerequisites

Ensure the following are installed on your machine before getting started:

- [Node.js](https://nodejs.org/) **v18 or higher** — [download here](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A running **MongoDB** instance — either:
  - **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** (cloud, free tier available — recommended), or
  - **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** (local)

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Mpho-Gift-Masina/FUTURE_FS_02.git

# 2. Navigate into the project
cd FUTURE_FS_02

# 3. Move into the server directory
cd server

# 4. Install dependencies
npm install

# 5. Create your environment file from the template
cp .env.example .env
```

Then open the newly created `.env` file and fill in your values (see [Environment Variables](#-environment-variables) below).

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory. A template is provided as `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | Optional | Port the server listens on. Defaults to `5000`. |
| `MONGO_URI` | ✅ Yes | MongoDB connection string. Use your Atlas URI or `mongodb://localhost:27017/minicrm` for local. |
| `JWT_SECRET` | ✅ Yes | Secret used to sign & verify JWT tokens. Use a long, random string in production. |

> ⚠️ **Never commit your `.env` file.** It is included in `.gitignore` by default.

---

## ▶️ Running the App

### Development (with auto-reload via nodemon)

```bash
cd server
npm run dev
```

### Production

```bash
cd server
npm start
```

Once running, the server will be available at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:5000`

---

### 🔑 Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ Public | Register a new admin account |
| `POST` | `/api/auth/login` | ❌ Public | Login and receive a JWT token |

**Request body (register & login):**

```json
{
  "email": "admin@example.com",
  "password": "yourPassword123"
}
```

**Successful login response:**

```json
{
  "message": "Login successful",
  "token": "<JWT>",
  "admin": {
    "id": "64a1f...",
    "email": "admin@example.com"
  }
}
```

---

### 👥 Leads — `/api/leads`

Protected routes require the `Authorization` header:

```
Authorization: Bearer <token>
```

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/leads` | ❌ Public | Submit a new lead |
| `GET` | `/api/leads` | 🔒 Admin | Get all leads. Add `?status=new` / `?status=contacted` / `?status=converted` to filter. |
| `GET` | `/api/leads/:id` | 🔒 Admin | Get a single lead by ID |
| `PUT` | `/api/leads/:id/status` | 🔒 Admin | Update a lead's status |
| `POST` | `/api/leads/:id/notes` | 🔒 Admin | Add a note to a lead |
| `DELETE` | `/api/leads/:id` | 🔒 Admin | Delete a lead |

**Create Lead — request body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0123456789",
  "source": "Website Contact Form",
  "message": "I'd like to learn more about your services."
}
```

**Update Status — request body:**

```json
{ "status": "contacted" }
```

Valid values: `new` | `contacted` | `converted`

**Add Note — request body:**

```json
{ "text": "Called Jane — she's interested. Follow up next week." }
```

---

## 🗂 Project Structure

```
FUTURE_FS_02/
├── server/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js   # Admin register & login logic
│   │   └── leadController.js   # Lead CRUD & notes logic
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protect middleware
│   ├── models/
│   │   ├── Admin.js            # Admin Mongoose schema
│   │   └── Lead.js             # Lead + Note Mongoose schemas
│   ├── routes/
│   │   ├── authRoutes.js       # Auth route definitions
│   │   └── leadRoutes.js       # Lead route definitions
│   ├── .env.example            # Environment variable template
│   ├── .gitignore              # Git ignore rules
│   ├── package.json            # npm scripts & dependencies
│   └── server.js               # Application entry point
├── .gitignore                  # Root-level git ignore rules
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
├── SECURITY.md                 # Security policy
└── README.md                   # This file
```

---

## 🌐 Deployment

This Node.js API can be deployed to any Node-capable hosting platform:

| Platform | Notes |
|---|---|
| [Render](https://render.com) | Free tier available; set env vars in the dashboard. Start command: `node server/server.js` |
| [Railway](https://railway.app) | Supports MongoDB add-on; easy one-click deploys |
| [Fly.io](https://fly.io) | Dockerfile-based deployments |
| [Heroku](https://heroku.com) | Requires a `Procfile`: `web: node server/server.js` |
| VPS / EC2 | Full control; use [PM2](https://pm2.keymetrics.io/) as a process manager |

**Pre-deployment checklist:**

- [ ] All environment variables are set in the hosting dashboard (never commit `.env`)
- [ ] `MONGO_URI` points to a MongoDB Atlas cluster (not `localhost`)
- [ ] `JWT_SECRET` is a long, randomly-generated string (64+ characters recommended)
- [ ] Confirm the start command matches your host (e.g., `node server/server.js` from the repo root)

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built with ❤️ as part of the **Future Interns Full-Stack Web Development Internship 2026**

</div>
