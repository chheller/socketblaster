var express = require('express');
var router = express.Router();
var clients = {};
module.exports = function(io) {

  io.on( "connection", function( socket )
  {
      console.log( "A user connected" );
      socket.on('add-user', function(data){
        console.log(data.username + " added");
        clients[data.username] = {
         "socket": socket.id
        };
      });
      
      socket.on('chat message', function(msg) {
        console.log(msg);
        socket.broadcast.emit('chat message', msg);
      });
      socket.on("Loaded", function() {
        console.log("Page loaded");
      });
      
      socket.on('private-message', function(data){
        console.log("Sending: " + data.content + " to " + data.username);
        if (clients[data.username]){
          io.sockets.connected[clients[data.username].socket].emit("add-message", data);
        } else {
          console.log("User does not exist: " + data.username); 
        }
      });
      
      //Removing the socket on disconnect
      socket.on('disconnect', function() {
        console.log("disconnect hit");
        for(var name in clients) {
          if(clients[name].socket === socket.id) {
            delete clients[name];
            break;
          }
        }	
      })

      
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