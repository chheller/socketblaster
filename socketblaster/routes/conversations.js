var express = require('express');
var router = express.Router();

/*
 * GET listings.
 */
router.get('/seeAll', function(req, res) {
    var db = req.db;
    var collection = db.get('conversations');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/findmsgs/:user', function(req, res) {
  var db = req.db;
  var collection = db.get('conversations');
  var user = req.params.user;
  console.log("searching for convos from: " + user);
  collection.find({ $or: [ {'username' : user}, {'sender' : user} ] }, {}, function(e,docs){
    if(e === null) {
      console.log(docs);
      res.json(docs);
    }
  });
});

/*
 * POST to addlisting.
 */
router.post('/new', function(req, res) {
    var db = req.db;
    var collection = db.get('conversations');
    console.log(req.body);

    collection.update(
      { 'username' : req.body.username, 'sender' : req.body.sender },
      { $push: { 'msg' : [req.body.msg] } },
      { upsert : true }
    );

})


module.exports = router;
