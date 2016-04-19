var express = require('express');
var router = express.Router();
module.exports = function(io) {

  io.on( "connection", function( socket )
  {
      console.log( "A user connected" );
      socket.on('chat message', function(msg) {
        console.log(msg);
        socket.broadcast.emit('chat message', msg);
      });
      socket.on("Loaded", function() {
        console.log("Page loaded");
      });
  });
  return router;
};
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
router.get('/Dashboard', function(req, res, next) {
  res.render('Dashboard', { title: 'Dashboard' });
});
router.get('/Browse', function(req, res, next) {
  res.render('Browse', { title: 'Browse Listings' });
});
