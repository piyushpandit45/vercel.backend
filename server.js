const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔍 INCOMING REQUEST: ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request Body:', req.body);
  }
  next();
});

// Route files
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

/**
 * Health check endpoint
 * @route   GET /
 * @desc    Test API connectivity
 * @access  Public
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Auratech Backend API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        getMe: 'GET /api/auth/me'
      },
      contact: {
        create: 'POST /api/contact',
        getAll: 'GET /api/contact',
        getById: 'GET /api/contact/:id',
        update: 'PUT /api/contact/:id',
        delete: 'DELETE /api/contact/:id'
      }
    }
  });
});

/**
 * Error handling middleware
 * Must be placed after all other middleware
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

/**
 * 404 handler
 * Must be placed after all routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
