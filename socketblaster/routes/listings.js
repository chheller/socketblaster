var express = require('express');
var router = express.Router();

/*
 * GET listings.
 */
router.get('/listings', function(req, res) {
    var db = req.db;
    var collection = db.get('listings');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/findlistings/:loc/:cat', function(req, res) {
  var db = req.db;
  var collection = db.get('listings');
  var location = req.params.loc;
  var category = req.params.cat;
  var lquery = "location : " + location;
  
  if(location == "All") {
    if(category == "All") {
      collection.find({}, {}, function(e,docs){
        if(e === null) {
          if(docs[0] != null) {
            res.json(docs);
          }
          else {res.send( { msg: "No Listings."} )}
        }
      });
    }
    else {
      collection.find({ 'category' : category }, {}, function(e,docs){
        if(e === null) {
          if(docs[0] != null) {
            res.json(docs);
          }
          else {res.send( { msg: "No Listings."} )}
        }
      });
    }
  }
  else {
    if(category == "All") {
      collection.find({ 'location' : location }, {}, function(e,docs){
        if(e === null) {
          if(docs[0] != null) {
            res.json(docs);
          }
          else {res.send( { msg: "No Listings."} )}
        }
      });
    }
    else {
      collection.find({ 'location' : location, 'category' : category }, {}, function(e,docs){
        if(e === null) {
          if(docs[0] != null) {
            res.json(docs);
          }
          else {res.send( { msg: "No Listings."} )}
        }
      });
    }
  }
});

/*
 * POST to addlisting.
 */
router.post('/addlisting', function(req, res) {
    var db = req.db;
    var collection = db.get('listings');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
})

/*
 * DELETE to deletelisting.
 */
router.delete('/deletelisting/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('listings');
    var listingToDelete = req.params.id;
    collection.remove({ '_id' : listingToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
