var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// This should become an enviroment variable
var url ="mongodb://parcial:parcial@ds147534.mlab.com:47534/rjmantilla-sandbox";

/* GET home page. */
router.get('/anonymous-graph', function(req, res, next) {
  mongodb.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      let tempHashMap = {};
      let count = 1;
      let graph = {data: []};
      result.map((user)=>{
        //console.log("lvl 1 "+user.username);
        if(tempHashMap[user.username] === undefined){
          tempHashMap[user.username]=count++;
        }
        let tempObj = {user: tempHashMap[user.username], follows: []};
        user.raw_data.map((following) => {
         // console.log("lvl 2 "+following.login);
          if(tempHashMap[following.login] === undefined){
            tempHashMap[following.login]=count++;
          }
          tempObj.follows.push(tempHashMap[following.login]);
        });
        graph.data.push(tempObj);
        graph['numNodes']= count-1;
      });
      res.json(graph);
    });
  });
});

module.exports = router;
