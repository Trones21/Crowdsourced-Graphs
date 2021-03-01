var express = require('express');
var router = express.Router();

/* GET Stats page. */
router.get('/', function(req, res, next) {
  res.render('stats', { title: 'Stats' });
});

module.exports = router;