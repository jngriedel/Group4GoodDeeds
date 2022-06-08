var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('******************')
  console.log('******************')
  console.log('******************')
  console.log('******************')
  console.log('******************')
  console.log('******************')
  console.log(res.locals.authenticaded)
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

module.exports = router;
