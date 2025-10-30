# Payroll Management System

Centralized payroll and payments platform with employee management, bank account handling, transaction history, rewards, and payroll processing. This repository contains a frontend (React + Vite) and a backend (Node.js + Express + MySQL).

## Quick links
- Frontend: ./frontend
- Backend: ./backend
- DB schema: ./backend/config/database.sql

## Features
- User authentication (login / register)
- Employee data management (CRUD)
- Bank account management for users/employees
- Transaction history and payroll runs
- Rewards management
- REST API for integration with frontend

## Technology stack
- Frontend: React, Vite, Tailwind/CSS
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT / middleware (see backend/middleware/auth.js)
- Payments: Razorpay (integration points in backend controllers)

## Repository structure (high level)
- backend/
  - app.js
  - .env
  - config/
    - db.js
    - database.sql
  - controller/
    - authcontroller.js
    - bankcontroller.js
    - employeecontroller.js
    - transactioncontroller.js
  - middleware/
    - auth.js
  - models/
    - User.js
    - Bank.js
    - Transaction.js
    - Reward.js
  - routes/
    - authRoutes.js
    - bankRoutes.js
    - employeeDataRoutes.js
    - transactionRoutes.js
- frontend/
  - index.html
  - src/
    - main.jsx
    - App.jsx
    - components/
    - page/
    - context/
    - hooks/
  - package.json

## Setup / Getting started

Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- MySQL server

Backend
1. Open terminal:
   cd backend
2. Install dependencies:
   npm install
3. Create a MySQL database and run the SQL in backend/config/database.sql to create required tables.
4. Create .env in backend with at least:
   - PORT=5000
   - DB_HOST=localhost
   - DB_USER=your_mysql_user
   - DB_PASSWORD=your_mysql_password
   - DB_NAME=your_database_name
   - JWT_SECRET=your_jwt_secret
   - RAZORPAY_KEY=...
   - RAZORPAY_SECRET=...
5. Start backend:
   npm run start
   (or node app.js / nodemon app.js)

Frontend
1. Open terminal:
   cd frontend
2. Install dependencies:
   npm install
3. Configure any environment / Firebase in src/components/firebase.js (if used).
4. Start dev server:
   npm run dev
5. Open: http://localhost:5173 (default Vite port)

## API overview

Check backend/routes/*.js for exact endpoints and payloads. Common routes include:

- Auth (backend/routes/authRoutes.js)
  - POST /auth/register
  - POST /auth/login
  - GET /auth/profile (protected)

- Bank accounts (backend/routes/bankRoutes.js)
  - POST /bank/add
  - GET /bank/list
  - PUT /bank/:id
  - DELETE /bank/:id

- Employee data & payroll (backend/routes/employeeDataRoutes.js)
  - GET /employees
  - POST /employees
  - GET /employees/:id
  - PUT /employees/:id
  - DELETE /employees/:id
  - POST /employees/:id/payrun (example endpoint — check file for exact)

- Transactions (backend/routes/transactionRoutes.js)
  - GET /transactions
  - POST /transactions
  - GET /transactions/:id

Note: Confirm exact method paths and request/response shapes by opening each route and controller file.

## Development notes
- Use the middleware at backend/middleware/auth.js to protect routes requiring authentication.
- Controllers in backend/controller/* contain business logic and database interaction.
- Models in backend/models/* map to database tables; keep them synced with database.sql.
- Frontend context AuthContext.jsx handles auth state; hooks/useApi.jsx centralizes API calls.

## Testing
- Add tests using your preferred framework (Jest / Mocha) in each folder.
- No test harness included by default.

## Deployment
- Build frontend: cd frontend && npm run build
- Serve frontend build from a static host (Netlify / Vercel) or serve via backend (configure static middleware).
- Ensure production DB credentials and secrets are set on the server.

## Troubleshooting
- DB connection errors: verify credentials in backend/.env and confirm MySQL server is running.
- Port conflicts: change PORT in backend/.env or Vite port in frontend/vite.config.js.

## Contribution
- Create feature branches, open PRs, include tests where applicable.
- Follow consistent linting and commit message style.

## License
MIT

## Contact / References
- Inspect frontend and backend folders for implementation details and route documentation.
- For questions about running the project on Windows: use the integrated terminal in VS Code (PowerShell or CMD).
