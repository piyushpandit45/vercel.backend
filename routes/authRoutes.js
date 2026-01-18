const express = require('express');
const {
  register,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * 
 * Example Request:
 * POST http://localhost:5000/api/auth/register
 * Content-Type: application/json
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 * 
 * Example Request:
 * POST http://localhost:5000/api/auth/login
 * Content-Type: application/json
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 * 
 * Example Request:
 * GET http://localhost:5000/api/auth/me
 * Headers: Authorization: Bearer <JWT_TOKEN>
 */
router.get('/me', protect, getMe);

module.exports = router;
