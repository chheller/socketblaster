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

router.get('/findmsgs/:sender/:recvr', function(req, res) {
  var db = req.db;
  var collection = db.get('conversations');
  var sender = req.params.sender;
  var recvr = req.params.recvr;
  collection.find({ 'username' : recvr, 'sender' : sender }, { 'sender' : { $exists : true }}, function(e,docs){
    if(e === null) {
      if(docs[0] != null) {
        res.json(docs);
      }
      else {res.send( { msg: "No Messages."} )}
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
