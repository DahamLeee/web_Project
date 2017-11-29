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

router.get('/', catchErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.page) || 10;

  var query = {};

  const parties = await Party.paginate(query, {
    sort: {createAt: -1},
    populate: 'author',
    page: page, limit: limit
  });
  res.render('parties/index', {parties: parties});
}))

router.get('/create', needAuth, catchErrors(async (req, res, next) => {
  const users = await User.find({});
  res.render('parties/create', {party:{}});
}));

/*event 만들기*/
router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  var party = new Party({
    title: req.body.title,
    author: user._id,
    location: req.body.location,
    description: req.body.description,
    organizerName: req.body.organizerName,
    organizerDescription: req.body.organizerDescription,
    price: req.body.price,
  });
  await party.save();
  req.flash('success', 'Successfully posted');
  res.redirect('/');
}));

module.exports = router;
