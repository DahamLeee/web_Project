const express = require('express');
const Party = require('../models/party');
const User = require('../models/user');
const Attend = require('../models/attend');
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

function validateForm(form){
  var content = form.content || "";
  content = content.trim();

  if(!content){
    return 'Content is required'
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

/*edit를 눌렀을 때*/
router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
  const party = await Party.findById(req.params.id);
  res.render('parties/edit', {party: party});
}))

router.get('/:id', catchErrors(async (req, res, next) => {
  const party = await Party.findById(req.params.id).populate('author');
  const attends = await Attend.find({party: party.id}).populate('author');

  await party.save();
  res.render('parties/show', {party: party, attends: attends});
}));


router.post('/:id', catchErrors(async (req, res, next) => {
  const party = await Party.findById(req.params.id);

  if (!party) {
    req.flash('danger', 'Not exist event');
    return res.redirect('back');
  }
  party.title = req.body.title;
  party.location = req.body.location;
  party.starts = req.body.starts;
  party.startM = req.body.startM;
  party.ends = req.body.ends;
  party.endM = req.body.endM;
  party.description = req.body.description;
  party.organizerName = req.body.organizerName;
  party.organizerDescription = req.body.organizerDescription;
  party.price = req.body.price;
  party.type = req.body.type;
  party.topic = req.body.topic;

  await party.save();
  req.flash('success', 'Successfully updated');
  res.redirect('/parties');

}));

router.delete('/:id', needAuth, catchErrors(async (req, res, next) =>{
  await Party.findOneAndRemove({_id: req.params.id});
  req.flash('success', 'Successfully deleted');
  res.redirect('/parties');
}));

/*event 만들기*/
router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  var party = new Party({
    title: req.body.title,
    author: user._id,
    starts: req.body.starts,
    startM: req.body.startM,
    ends: req.body.ends,
    endM: req.body.endM,
    location: req.body.location,
    description: req.body.description,
    organizerName: req.body.organizerName,
    organizerDescription: req.body.organizerDescription,
    type: req.body.type,
    topic: req.body.topic,
    price: req.body.price
  });
  await party.save();
  req.flash('success', 'Successfully posted');
  res.redirect('/');
}));

/*댓글 달기*/
router.post('/:id/attends', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  const party = await Party.findById(req.params.id);
  var err = validateForm(req.body);

  if (!party) {
    req.flash('danger', 'Not exist event');
    return res.redirect('back');
  }

  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }

  var attend = new Attend({
    author: user._id,
    party: party._id,
    content: req.body.content
  });
  await attend.save();
  party.numAttends++;
  await party.save();

  req.flash('success', 'Successfully registed!');
  res.redirect(`/parties/${req.params.id}`);
}));

module.exports = router;
