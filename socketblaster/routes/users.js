var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/login/:email/:password', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var emailn = req.params.email;
  var password = req.params.password;
  collection.find({ 'email' : emailn }, { 'email' : { $exists : true }}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        if(password == docs[0].password) {
          console.log("password match");
          res.send( { msg: "true"} );
        }
        else {res.send( { msg: "wrong credentials"} )}
      }
      else {res.send( { msg: "wrong credentials"} )}
    }
  });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
})

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
