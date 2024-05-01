const express = require('express');
const router = express.Router();
const multer = require('multer');
const Card = require('../models/Card'); // Adjust path as necessary to your Card model

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// POST endpoint for creating a new card
router.post('/', upload.single('image'), (req, res) => {
    const { name, type, colour } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    const newCard = new Card({
        name,
        type,
        colour,
        imageUrl
    });

    newCard.save()
        .then(card => res.status(201).json(card))
        .catch(err => res.status(500).json({ message: err.message }));
});

// GET endpoint for retrieving all cards
router.get('/', (req, res) => {
    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(500).json({ message: err.message }));
});

// GET endpoint to retrieve a single card by ID
router.get('/:id', (req, res) => {
    Card.findById(req.params.id)
        .then(card => {
            if (card) {
                res.json(card);
            } else {
                res.status(404).json({ message: 'Card not found' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// PUT endpoint to update a card by ID
router.put('/:id', upload.single('image'), (req, res) => {
    const updates = req.body;
    if (req.file) {
        updates.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    Card.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then(card => {
            if (card) {
                res.json(card);
            } else {
                res.status(404).json({ message: 'Card not found' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// DELETE endpoint to delete a card by ID
router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({ _id: req.params.id });
        if (!card) {
            return res.status(404).send({ message: 'Card not found' });
        }
        res.status(200).send({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).send({ message: 'Failed to delete card' });
    }
});

module.exports = router;
