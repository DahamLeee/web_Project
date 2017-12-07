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
router.get('/', needAuth, catchErrors(async (req, res, next) => {
  const users = await User.find({});
  res.render('users/index', {users: users});
}))

router.get('/signup', (req, res, next) => {
  res.render('users/signup', {messages: req.flash()});
});


router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', {user: user});
}))


/* 여기서 put 메소드는 뭐를 하는것일까?
edit를 하기위한 route인거 같다. edit.pug에서 form의 action:이 method put으로 가게 코딩되어있음
*/
router.put('/:id', needAuth, catchErrors(async (req, res, next) => {
  const err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }

  const user = await User.findById({_id: req.params.id});
  if (!user) {
    req.flash('danger', 'Not exist user.');
    return res.redirect('back');
  }

  if(!await user.validatePassword(req.body.current_password)){
    req.flash('danger', 'Current password invalid.');
    return res.redirect('back');
  }

  user.name = req.body.name;
  user.email = req.body.email;
  if (req.body.password){
    user.password = await user.generateHash(req.body.password);
  }
  await user.save();
  req.flash('success', 'Updated successfully');
  res.redirect('/users');
}))

router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
  const user = await User.findOneAndRemove({_id: req.params.id});
  req.flash('success', 'Deleted successfully.');
  res.redirect('/users');
}))

//signup ,, id만들기
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
  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/');
}));

module.exports = router;
