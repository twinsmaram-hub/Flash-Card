
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
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