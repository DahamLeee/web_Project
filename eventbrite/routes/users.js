const express = require('express');
const User = require('../models/user')
const router = express.Router();
const catchErrors = require('../lib/async-error');

function needAuth(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else{
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

function validateForm(form, options){
  var email = form.email || "";
  var name = form.name || "";
  mail = email.trim();
  name = name.trim();

  if(!email){
    return 'Email is required';
  }

  if(!name){
    return 'Name is required';
  }

  if(!form.password && options.needPassword){
    return 'Password is required';
  }

  if(form.password !== form.password_confirmation){
    return 'Password do not match';
  }

  if(form.password.length < 6){
    return 'Password must be at least 6 characters';
  }

  return null;
}

/* GET users listing. */


router.get('/signup', (req, res, next) => {
  res.render('users/signup', {messages: req.flash()});
});

router.post('/', catchErrors(async(req, res, next) => {
  var err = validateForm(req.body, {needPassword: true});
  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }
  var user = await User.findOne({email: req.body.email});
  console.log('USER???', user);
  if(user){
    req.flash('danger', 'Email address already exists.');
    return res.redirect('back');
  }
  user = new User({
    email: req.body.email,
    name: req.body.name,
  });
  user.password = await user.generateHash(req.body.password);
  await user.save();
  req.flash('succes', 'Registered succesfully. Please sign in.');
  res.redirect('/');
}));

module.exports = router;
