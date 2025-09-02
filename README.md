# Payment-Management
# Payment Management System

A full-stack payment management application with user authentication, bank account management, transaction history, and rewards. Built using React (frontend) and Node.js/Express with MySQL (backend).

## Features

- User Signup & Login (with Google/Firebase)
- Add and manage bank accounts
- View transaction history
- Make payments (Razorpay integration)
- Rewards and referral system
- Responsive dashboard UI

## Project Structure

```
Paymentsgetway/
├── backend/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   └── authcontroller.js
│   ├── models/
│   │   └── userModel.js
│   └── routes/
│       └── user.Routes.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── page/
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Backend

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Configure MySQL:**
   - Update `config/db.js` with your MySQL credentials.
   - Create a database named `payment` and required tables (e.g., `bank_accounts`).

3. **Start the server:**
   ```sh
   node app.js
   ```
   The backend runs on port specified in `.env` (default: 5000).

### Frontend

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

## Environment Variables

- Backend: `.env` file for PORT and database credentials.
- Frontend: Firebase config in [`src/components/firebase.js`](frontend/src/components/firebase.js).

## API Endpoints

- `POST /user/addbank` — Add a new bank account
- (More endpoints can be added as needed)

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Firebase Auth
- **Backend:** Node.js, Express, MySQL
- **Payments:** Razorpay

## License

MIT

---

For more details, see [frontend/README.md](frontend/README.md)