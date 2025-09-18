const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.Routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Payment Management System API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment Management System server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});