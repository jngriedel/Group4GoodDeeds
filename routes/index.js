var express = require('express');
var router = express.Router();
const { Deed } = require('../db/models');

/* GET home page. */
router.get('/',  async(req, res, next) => {
  const deeds = await Deed.findAll();

  res.render('index', { title: 'Good Deeds Home', deeds });
});

module.exports = router;
