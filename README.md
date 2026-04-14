<div align="center">

# 🧩 FUTURE_FS_02 — Full-Stack CRM System

> A full-stack customer relationship management system with a **React + Vite frontend** and a **Node.js / Express / MongoDB backend API**, built as part of the **Future Interns Full-Stack Web Development Internship — Task 2 (2026)**.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-black?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
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
- [Frontend Notes](#-frontend-notes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About the Project

**FUTURE_FS_02** is a full-stack CRM application that provides a straightforward customer relationship management solution for small businesses and solo developers.

Built as part of the **Future Interns Full-Stack Web Development Internship 2026**, the project demonstrates a complete full-stack workflow using:

- **React + Vite** for the frontend
- **Node.js + Express** for the backend
- **MongoDB** for data storage
- **JWT authentication** for protected admin actions

The system allows anyone to submit a lead through a public interface, while authenticated admins can view, track, and manage those leads through a simple sales pipeline:

> **New → Contacted → Converted**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Frontend UI** | React + Vite client for interacting with the system |
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
| **Frontend** | React, Vite, JavaScript |
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 5 |
| **Database** | MongoDB Atlas / Local MongoDB |
| **ODM** | Mongoose 9 |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` |
| **Configuration** | `dotenv` |
| **Dev Server** | `nodemon` |

---

## 📸 Screenshots

> _Screenshots or GIF recordings of the frontend and backend in action can be added here._

---

## ✅ Prerequisites

Ensure the following are installed on your machine before getting started:

- [Node.js](https://nodejs.org/) **v18 or higher**
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- A running **MongoDB** instance — either:
  - **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**, or
  - **[MongoDB Community Server](https://www.mongodb.com/try/download/community)**

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Mpho-Gift-Masina/FUTURE_FS_02.git

# 2. Navigate into the project
cd FUTURE_FS_02