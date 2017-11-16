const express = require('express');
const Party = require('../models/party');
const User = require('../models/user');
const catchErrors = require('../lib/async-error');

const router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()){
    next();
  } else{
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

router.get('/create', needAuth, catchErrors(async (req, res, next) => {
  const users = await User.find({});
  res.render('parties/create', {party:{}});
}));



module.exports = router;
