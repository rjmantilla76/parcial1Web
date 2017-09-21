var express = require('express');
var GitHubApi = require ('github');
var router = express.Router();
var github = new GitHubApi({});
/* GET users listing. */
router.get('/:username', function(req, res, next) {
  const usernameReq = req.params.username;
  github.users.getFollowingForUser({
    username: usernameReq
  }, function(err,response){
      if(response != undefined){
        res.json(response);
      } else {
        res.json({});
      }
  });
});

module.exports = router;
