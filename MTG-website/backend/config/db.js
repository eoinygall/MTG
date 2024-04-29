const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);  // Exit process with failure
    }
};

module.exports = connectDB;