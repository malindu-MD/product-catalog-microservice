/**
 * Main App.
 * Set up Express server and middleware for the application.
 */

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up routes
app.use('/api', productRoutes);

// Error handling middleware
app.use(errorHandler);

// Set server to listen on port defined in environment variable or fallback to 5000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
