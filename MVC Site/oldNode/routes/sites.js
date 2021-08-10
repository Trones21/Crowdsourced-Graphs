let db = require('../public/collections/sitesCollection.json')
const Hogan = require('hjs');
const fs = require('fs')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:siteid', function(req, res, next) {

  var arr = db;
  var site = arr.filter(i => i.siteid == req.params.siteid)[0];
  var template = Hogan.compile("{{#endpoints}}<p>Endpoint uri: {{endpoint}} lastUpdated: {{lastUpdate}}</p>{{/endpoints}}");
  var ef = template.render({"endpoints": site.endpoints });
  res.render( 'sites', {site:site, endpointsFragment:ef} );
});

router.post('/new', function(req, res, next){
  let x = req.body

  fs.writeFile('f2.json')
  res.send({status:200})
} );

module.exports = router;
