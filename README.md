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
- [Contact Form Email Handler](#-contact-form-email-handler)
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
| 📋 **Lead Capture** | Public endpoint to receive new leads |
| 🔍 **Lead Listing** | Retrieve all leads and filter by status |
| 👁 **Lead Detail** | Fetch full details of a single lead by ID |
| 🔄 **Status Pipeline** | Move leads through `new → contacted → converted` |
| 📝 **Notes** | Append time-stamped notes to any lead |
| 🗑 **Delete Lead** | Permanently remove a lead |
| 📬 **Contact Form Email Handler** | Send messages from the landing page to the project owner |
| 🔒 **Route Protection** | Admin-only operations are protected by JWT middleware |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, JavaScript |
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas / Local MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` |
| **Configuration** | `dotenv` |
| **Email** | Nodemailer + Gmail SMTP |
| **Dev Server** | `nodemon` |

---

## 📸 Screenshots

> Screenshots or demo GIFs can be added here.

---

## ✅ Prerequisites

Make sure you have:

- **Node.js** v18 or higher
- **npm**
- **MongoDB Atlas** account or local MongoDB installation
- A **Gmail account** with a **Google App Password** for the contact form email feature

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mpho-Gift-Masina/FUTURE_FS_02.git
cd FUTURE_FS_02