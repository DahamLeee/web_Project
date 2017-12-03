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
  res.render('parties/create', {party:{}});
}));

router.get('/:id', catchErrors(async (req, res, next) => {
  const party = await Party.findById(req.params.id).populate('author');

  await party.save();
  res.render('parties/show', {party: party});
}));

/*edit
router.post('/:id', catchErrors(async (req, res, next) => {
  const party = await Party.findById(req.params.id);

  if (!party) {
    req.flash('danger', 'Not exist event');
    return res.redirect('back');
  }
  party.title = req.body.title;
  party.content = req.body.title;
}));*/


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
