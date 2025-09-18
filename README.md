# Payment Management System

A comprehensive payment management system built with React frontend and Node.js backend, featuring secure money transfers, bank account management, and transaction tracking.

## Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt

### 💰 Payment Features
- **Money Transfer**: Send money to other users by username
- **Add Money**: Deposit money from bank accounts to wallet
- **Transaction History**: Complete transaction tracking with status updates
- **Real-time Balance**: Live wallet balance updates

### 🏦 Bank Account Management
- Add multiple bank accounts
- Set primary bank account
- Secure account information storage
- IFSC code validation

### 📊 Dashboard
- Overview with wallet balance, bank accounts, and transaction counts
- Recent transactions display
- Comprehensive transaction history
- Modern, responsive UI

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Material-UI** - Beautiful, responsive components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - User notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Database Schema

The system uses MySQL with the following main tables:

- **users** - User accounts and wallet balances
- **bank_accounts** - Linked bank account information
- **transactions** - All payment transactions
- **transaction_logs** - Audit trail for transactions
- **payment_methods** - Additional payment methods

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=12410279
   DB_NAME=payment
   PORT=4000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Set up MySQL database**
   - Create a MySQL database named `payment`
   - Run the SQL script from `backend/config/database.sql` to create tables

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile

### Bank Accounts
- `POST /api/user/addbank` - Add bank account
- `GET /api/user/banks` - Get user's bank accounts
- `PUT /api/user/banks/:accountId/primary` - Set primary bank account

### Transactions
- `POST /api/user/transfer` - Transfer money
- `POST /api/user/addmoney` - Add money to wallet
- `GET /api/user/transactions` - Get transaction history
- `GET /api/user/transactions/:transactionId` - Get specific transaction

### Health Check
- `GET /api/health` - API health status

## Usage

### 1. Registration
- Visit `http://localhost:5173`
- Fill in the registration form with username, email, password, and full name
- Click "Create Account"

### 2. Login
- Visit `http://localhost:5173/login`
- Enter your email and password
- Click "Sign In"

### 3. Dashboard
After login, you'll be redirected to the dashboard where you can:
- View your wallet balance
- See recent transactions
- Navigate to different sections

### 4. Add Bank Account
- Go to "Bank Accounts" section
- Click "Add Bank Account"
- Fill in account details (account number, bank name, IFSC, holder name)
- Click "Add Bank"

### 5. Transfer Money
- Go to "Transfer Money" section
- Click "Send Money"
- Enter receiver's username, amount, and optional description
- Click "Transfer"

### 6. Add Money to Wallet
- Go to "Add Money" section
- Click "Add Money"
- Enter amount and select bank account
- Click "Add Money"

### 7. View Transactions
- Go to "Transactions" section
- View complete transaction history with details

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **CORS Configuration**: Proper cross-origin setup
- **Transaction Logging**: Complete audit trail

## Error Handling

The system includes comprehensive error handling:
- Client-side form validation
- Server-side input validation
- Database error handling
- Network error handling
- User-friendly error messages

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite development server
```

### Database Management
- Use the provided SQL script to set up the database schema
- Modify `backend/config/db.js` for different database configurations
- Check `backend/config/database.sql` for table structures

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure proper database credentials
4. Use PM2 or similar for process management

### Frontend
1. Build the production bundle: `npm run build`
2. Serve static files with nginx or similar
3. Configure environment variables for API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please create an issue in the repository.

---

**Note**: This is a development/demo system. For production use, implement additional security measures, proper logging, monitoring, and compliance with financial regulations.