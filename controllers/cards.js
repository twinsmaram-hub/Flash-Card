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
    await Cards.create(req.body);
    res.redirect('/cards');
  } catch (error) {
    console.error(error);
    res.redirect('/cards/new');
  }
});


// Show
router.get('/:id', async (req, res) => {
  try {
    const card = await Cards.findById(req.params.id).populate('owner');
    res.render('cards/show.ejs', { card });
  } catch (error) {
    console.error(error);
    res.redirect('/cards');
  }
});
// Delete
router.delete('/:id', async (req, res) => {
  try {
    const card = await Cards.findById(req.params.id);
    const isOwner = card.owner.equals(req.session.user._id);

    if (isOwner) {
      await card.deleteOne();
      res.redirect('/cards');
    } else {
      throw new Error(`Permission Denied to ${req.session.user.username}`);
    }
  } catch (error) {
    console.error(error);
    res.redirect('/cards');
  }
});




module.exports = router;