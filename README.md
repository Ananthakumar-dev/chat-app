# Chat Application

A real-time chat application with Next.js frontend and Express backend.

## Project Structure


## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env

# Run backend (from backend directory)
npm run dev

# Run frontend (from frontend directory)
npm run dev


## Step 5: Add and Commit Files

```bash
# Check what files will be committed (should NOT show node_modules, .env, etc.)
git status

# Add all files (respects .gitignore)
git add .

# If you want to review what you're adding first
git add -p

# Commit the files
git commit -m "Initial commit: Chat application monorepo with Next.js frontend and Express backend"