var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Socket Blaster' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
router.get('/WebGLTest', function(req, res, next) {
	res.render('GameIndex', {title: 'WebGL Test'});
});
router.get('/JessWebGLTest', function(req, res, next) {
	res.render('GameIndex2', {title: 'WebGL Test Two'});
});
router.get('/createlisting', function(req, res, next) {
  res.render('createlisting', { title: 'Create Listing' });
});
module.exports = router;
