const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const router = new express.Router();
const jwt = require('jsonwebtoken')


// users
//       create
router.post("/users/signup", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  try {
    if (!existUser) {
      const user = new User(req.body);
      await user.generateAuthToken()
      await user.save().then(() => {
        res.send({ user });
      });
    } else {
      res.send("User already exist");
    }
  } catch (error) {
    res.send(error.message);
  }
});

// login with existing
router.post("/users/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)){
        jwt.sign({user}, 'thisisuser', { expiresIn: '1w' }, (error, token) => {
          if(error) { console.log(error) }    
          res.send(user);
      });
        res.send( user );
      } else {
        res.send("Unable to login!")
      }
    } else {
      res.send("Unable to login!")
    }
  } catch (error) {
    res.send("Unable to login!");
  }
});

// update user information
router.patch(`/users/update`, auth, async (req, res) => {
  // data and of user
  const user_id = req.user._id;
  const updateData = await bcrypt.hash(req.body.password, 8) ;

  // update
  try {
    const user = await User.findOneAndUpdate({_id: user_id}, {password: updateData}, {
      returnOriginal: false
    }); 
      await user.save()
      if (!user){
        return res.send('Failed to update!')
      }
      res.send(user)
  } catch (error) {
      res.send(error)
  }
})


module.exports = router;
