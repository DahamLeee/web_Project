var express = require('express');
const Party = require('../models/party');
const catchErrors = require('../lib/async-error');
var router = express.Router();

/* GET home page. */
router.get('/', catchErrors(async (req, res, next) =>{

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.page) || 12;

  var query = {};

  const parties = await Party.paginate(query, {
    sort: {createAt: -1},
    populate: 'author',
    page: page, limit: limit
  });
  res.render('index', {parties: parties});
}));

module.exports = router;
