const express = require('express');
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Create a new contact message
 * @access  Public
 * 
 * Example Request:
 * POST http://localhost:5000/api/contact
 * Content-Type: application/json
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "message": "I am interested in your services"
 * }
 */
router.post('/', createContact);

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages
 * @access  Private (Admin only)
 * 
 * Example Request:
 * GET http://localhost:5000/api/contact
 * Headers: Authorization: Bearer <JWT_TOKEN>
 */
router.get('/', protect, getContacts);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact message
 * @access  Private (Admin only)
 * 
 * Example Request:
 * GET http://localhost:5000/api/contact/60f7b3b3b3b3b3b3b3b3b3b
 * Headers: Authorization: Bearer <JWT_TOKEN>
 */
router.get('/:id', protect, getContact);

/**
 * @route   PUT /api/contact/:id
 * @desc    Update contact status
 * @access  Private (Admin only)
 * 
 * Example Request:
 * PUT http://localhost:5000/api/contact/60f7b3b3b3b3b3b3b3b3b
 * Headers: Authorization: Bearer <JWT_TOKEN>
 * Content-Type: application/json
 * {
 *   "status": "read"
 * }
 */
router.put('/:id', protect, updateContact);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact message
 * @access  Private (Admin only)
 * 
 * Example Request:
 * DELETE http://localhost:5000/api/contact/60f7b3b3b3b3b3b3b3b3b
 * Headers: Authorization: Bearer <JWT_TOKEN>
 */
router.delete('/:id', protect, deleteContact);

module.exports = router;
