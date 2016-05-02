var express = require('express');
var router = express.Router();
var clients = {};
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
  module.exports = function(io) {

    io.on( "connection", function( socket )
    {
        console.log( "A user connected" );

       socket.on('add-user', function(data){
         console.log(data.username + " added");
         clients[data.username] = {
          "socket": socket.id
         };

         for(var name in clients) {
           io.sockets.connected[clients[name].socket].emit("user-connected", data);
         }

         var users = "";

         for(var name in clients) {
           users = users + name + "-";
         }

         io.sockets.connected[clients[data.username].socket].emit("currentUser-list", users);

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
           io.sockets.connected[clients[data.sender].socket].emit("send-confirmation", "Sent to " + data.username + ": " + data.msg);

         } else {
           console.log("User does not exist: " + data.username);
           io.sockets.connected[clients[data.sender].socket].emit("add-message", "user does not exist");
         }
       });

       //Removing the socket on disconnect
       socket.on('disconnect', function() {
         for(var name in clients) {
           if(clients[name].socket === socket.id) {
             delete clients[name];
             break;
           }
         }
         var users = "";
         for(var temp in clients) {
           users = users + temp + "-";
         }
         for(var temp in clients) {
           io.sockets.connected[clients[temp].socket].emit("currentUser-list", users);
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
router.get('/Browse', function(req, res, next) {
  res.render('Browse', { title: 'Browse Listings' });
});
router.post('/createlisting', upload.single("userPhoto"), function(req, res){
  console.dir(req.file);
});
