const Contact = require('../models/Contact');

/**
 * @desc    Create a new contact message
 * @route   POST /api/contact
 * @access  Public
 * 
 * Example Request Body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "message": "I am interested in your services"
 * }
 */
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('🔍 CONTACT DEBUG - Request received:', { name, email, message: message.substring(0, 50) + '...' });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ CONTACT DEBUG - Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Create contact message
    console.log('🔍 CONTACT DEBUG - Creating contact message...');
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    console.log('✅ CONTACT DEBUG - Contact created successfully:', {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      status: contact.status,
      createdAt: contact.createdAt
    });

    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('❌ CONTACT DEBUG - Contact creation error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while sending message'
    });
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single contact message
 * @route   GET /api/contact/:id
 * @access  Private (Admin only)
 */
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update contact status
 * @route   PUT /api/contact/:id
 * @access  Private (Admin only)
 */
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Contact status updated',
      data: updatedContact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Contact message deleted'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
