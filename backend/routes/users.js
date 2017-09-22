var express = require('express');
var GitHubApi = require ('github');
var mongodb = require('mongodb');

// This should become an enviroment variable
var url ="mongodb://parcial:parcial@ds147534.mlab.com:47534/rjmantilla-sandbox";

var router = express.Router();
var github = new GitHubApi({});
/* GET users listing. */
router.get('/:username', function(req, res, next) {
  const usernameReq = req.params.username;
  //First we check if the registry exists in the DB
  mongodb.connect(url, (err,db) =>{
    if(err) throw err;
    let query = {username: usernameReq};
    db.collection('users').findOne(query, (err,result) =>{
      if(err) throw err;
      if(result != null){
        //If we find it we're done
        res.json(result.raw_data);
        db.close();
      } else {
        //else query
        github.users.getFollowingForUser({
          username: usernameReq
        }, function(err,response){
            if(response != undefined){
              //and add it to the db
              res.json(response.data);
              let tempObj = {username: usernameReq, raw_data: response.data};
              db.collection('users').insertOne(tempObj, (err,res)=>{
                db.close();
              });
            } else {
              res.json({});
              db.close();
            }
        });
      }
      
    });
  });
});

module.exports = router;
