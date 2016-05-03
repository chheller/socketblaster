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
  collection.find({ $or: [ {'username' : user}, {'sender' : user} ] }, {}, function(e,docs){
    if(e === null) {
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
    var theDate = Date();

    // collection.update(
    //   { 'username' : req.body.username, 'sender' : req.body.sender },
    //   { $push: { 'msgs' : { 'content' : req.body.msg , 'date' : theDate } } },
    //   { upsert : true }
    // );

    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });

})


module.exports = router;
