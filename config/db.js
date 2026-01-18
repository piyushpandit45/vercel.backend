const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Database Configuration
 * Connects to MongoDB using Mongoose
 * Uses environment variable MONGO_URI for connection string
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log(`Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Log all collections when connected
    mongoose.connection.on('open', () => {
      console.log('MongoDB connection opened successfully');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
