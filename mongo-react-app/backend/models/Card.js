const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    type: String,
    colour: String,
    imageUrl: String // Field to store the image URL
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
