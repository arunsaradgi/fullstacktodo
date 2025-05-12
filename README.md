# MERN Todo App

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) using ES modules.

## Features

- Create, Read, Update, and Delete todos
- Mark todos as complete/incomplete
- Responsive design with Tailwind CSS
- Toast notifications for user feedback

## Project Structure

```
.
├── backend/             # Node.js + Express backend
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── server.js       # Express server
│   └── package.json    # Backend dependencies
│
└── frontend/           # React frontend
    ├── src/           # Source files
    ├── public/        # Static files
    └── package.json   # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variable:
   ```
   VITE_API_URL=your_backend_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment (Railway)

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Railway will set this automatically

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Add the following environment variable:
   - `VITE_API_URL`: Your Railway backend URL

## Technologies Used

- Frontend:
  - React.js
  - Vite
  - Tailwind CSS
  - Axios
  - React Icons
  - React Toastify

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - CORS
  - Dotenv 