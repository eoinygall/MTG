const express = require('express');
const multer = require('multer');
const Card = require('../models/Card');  // Adjust the path based on your project structure
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save the uploaded images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Name the file with a timestamp to avoid duplicates
  }
});

const upload = multer({ storage: storage });

// Route to get all cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch cards' });
  }
});

// Route to add a new card
router.post('/cards', upload.single('image'), async (req, res) => {
  try {
    const card = new Card({
      name: req.body.name,
      type: req.body.type,
      colour: req.body.colour,
      imageUrl: req.file ? `uploads/${req.file.filename}` : null  // Save relative path
    });
    await card.save();
    res.status(201).send(card);  // Respond with the created card
  } catch (error) {
    console.error('Error adding card:', error);
    res.status(400).send({ error: 'Failed to add card' });
  }
});


// Route to delete a specific card by ID
router.delete('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).send({ error: 'Card not found' });
    }
    res.send({ message: 'Card deleted successfully', card });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete card' });
  }
});

// Route to delete all cards
router.delete('/cards', async (req, res) => {
  try {
    await Card.deleteMany({});
    res.send({ message: 'All cards deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete all cards' });
  }
});

// Route to update a specific card by ID
router.put('/cards/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedCard = {
      name: req.body.name,
      type: req.body.type,
      colour: req.body.colour,
      imageUrl: req.file ? req.file.path : req.body.imageUrl  // Use the new image if uploaded, otherwise keep the existing one
    };

    const card = await Card.findByIdAndUpdate(req.params.id, updatedCard, { new: true, runValidators: true });

    if (!card) {
      return res.status(404).send({ error: 'Card not found' });
    }

    res.send(card);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update card' });
  }
});

// Route to get a specific card by ID
router.get('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).send({ error: 'Card not found' });
    }
    res.send(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).send({ error: 'Failed to fetch card' });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    const results = await Card.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },  // Case-insensitive search by name
        { type: { $regex: q, $options: 'i' } }   // Case-insensitive search by type
      ]
    });
    
    res.json(results);
  } catch (err) {
    console.error('Error fetching search results:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
