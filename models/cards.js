// models/listing.js

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cards = mongoose.model('Cards', cardSchema);

module.exports = Cards;