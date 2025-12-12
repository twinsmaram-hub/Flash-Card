const express = require('express');

const router = express.Router();
const Cards = require('../models/cards');


router.get('/', async (req, res) => {
  try {
    const card = await Cards.find().populate('owner');

    res.render('cards/index.ejs', { card });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create
router.get('/new', async (req, res) => {
  try {
    res.render('cards/new.ejs');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    await Listing.create(req.body);
    res.redirect('/cards');
  } catch (error) {
    console.error(error);
    res.redirect('/cards/new');
  }
});




module.exports = router;