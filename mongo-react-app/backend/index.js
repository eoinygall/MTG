// Importing necessary modules
const express = require('express');
const connectDB = require('./config/db'); // Assuming db.js is in a config folder
//require('dotenv').config(); // Load environment variables from .env file at the root of the project

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Define a simple route to check the server status
app.get('/', (req, res) => {
    res.send('Hello World! The server is up and running.');
});

// Importing routes
const cardRoutes = require('./routes/cardRoutes');
app.use('/cards', cardRoutes); // Use card routes for requests to /cards

// Setting the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Optional: Handle unhandled promise rejections (commonly database connection issues)
process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
