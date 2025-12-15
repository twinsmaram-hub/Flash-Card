const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

router.get('/sign-up', async (req, res, next) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-out', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    // make sure the user does not exist
    const userInDatabase = await User.findOne({ username });

    if (userInDatabase) {
      return res.send('Username or Password is invalid');
    }
    // validate the passwords match
    if (password !== confirmPassword) {
      return res.send('Username or Password is invalid');
    }
    // take the password and encrypt in some way.
    const hashPassword = bcrypt.hashSync(password, 10);

    // If the above passes, then let's create the account
    // with the encrypted password.
    req.body.password = hashPassword;
    delete req.body.confirmPassword;

    const user = await User.create(req.body);
    // when that succeeds let's go ahead and "sign the person in"
    // rediret them to some page
    req.session.user = {
      username: user.username,
      _id: user._id,
      pictureprof: user.pictureprof,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong with registration!');
  }
});

router.get('/sign-in', async (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
  try {
    // try to find the user inthe db
    const { username, password } = req.body;
    // make sure the user does not exist
    const userInDatabase = await User.findOne({ username });

    // if the user does not exist, redirect to sign up with msg
    if (!userInDatabase) {
      return res.send('Username or Password is invalid');
    }
    // i the user exists, lets compare the pw with the usr pw

    const isValidPassword = bcrypt.compareSync(password, userInDatabase.password);
    // if the pw doesnt match, throw an error
    if (!isValidPassword) {
      return res.send('Username or Password is invalid');
    }

    // else continue with the "login"
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      pictureprof: userInDatabase.pictureprof,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong with Sign In');
  }
});



// //update

// router.post('/', async (req, res) => {
//   try {
//     req.body.owner = req.session.user._id;
//     res.redirect('/cards');
//   } catch (error) {
//     console.error(error);
//     res.redirect('/auth/sing-in');
//   }
// });

// router.put('/:id', async (req, res) => {
//    try {
//      const isCurrentUser = req.params.id === req.session.user._id.toString();

//      if (isCurrentUser) {
//     if (req.body.password) {
//      req.body.password = bcrypt.hashSync(req.body.password, 10);
//      }
      
//     await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//      res.redirect(`/auth/${req.params.id}`); 

//    } else {
//    res.send("Unauthorized to edit this user."); 
//    } 
//  } catch (error) {
//    console.error(error);
//    res.redirect('/auth/sign-in'); 
//   }
// });

// router.get('/:id/edit', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//     res.render('auth/edit.ejs', { user })
//   } catch (error) {
//     console.error(error)
//     res.redirect('/auth/sing-in')
//   }
// })
// Delete
// router.delete('/:id', async (req, res) => {
//   try {
//     const card = await Cards.findById(req.params.id);
//     const isOwner = card.owner.equals(req.session.user._id);

//     if (isOwner) {
//       await card.deleteOne();
//       res.redirect('/cards');
//     } else {
//       throw new Error(`Permission Denied to ${req.session.user.username}`);
//     }
//   } catch (error) {
//     console.error(error);
//     res.redirect('/cards');
//   }
// });
// // Show
// router.get('/:id', async (req, res) => {
//   console.log('Show Route')
//   try {
//     const card = await Cards.findById(req.params.id).populate('owner');

//     res.render('cards/show.ejs', {
//       card,
//       user: req.session.user ,
//       isOwner: card.owner._id.equals(req.session.user._id)
// });
//   } catch (error) {
//     console.error(error);
//     res.redirect('/cards');
//   }
// });


module.exports = router;
