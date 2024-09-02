const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection (update with your MongoDB Atlas or local connection string)
mongoose.connect('mongodb://localhost:27017/cardDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected locally'))
    .catch(err => console.log('MongoDB connection error:', err));

// Import the Card model
const Card = require('./models/Card');

app.get('/', (req, res) => {
    res.send('API is running...');
  });
  
// Define the search route
app.get('/api/search', async (req, res) => {
  try {
      const query = req.query.q.toLowerCase();
      const results = await Card.find({
          $or: [
              { name: { $regex: query, $options: 'i' } },
              { type: { $regex: query, $options: 'i' } },
              { colour: { $regex: query, $options: 'i' } }
          ]
      });
      res.json(results);
  } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.put('/cards/:id', async (req, res) => {
    try {
      const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!card) {
        return res.status(404).send();
      }
      res.send(card);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
// Use routes (e.g., card routes if any)
app.use('/cards', require('./routes/cardRoutes')); // Ensure this path is correct
app.use('/api',require('./routes/cardRoutes'));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
