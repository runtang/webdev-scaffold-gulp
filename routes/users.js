var express = require('express');
var router = express.Router();


router.get('/getUser', function(req, res, next) {
  //get请求内容
  console.log(req.query);

  var user = {
  	uid: 1,
  	uname: 'Alex',
  	age: 16
  }

  var ret = {
  	state: 'ok',
  	data: user
  }

  res.send(ret);
});

router.post('/setUser', function(req, res, next) {
  //post请求内容
  console.log(req.body);

  var user = {
  	uid: 1,
  	uname: 'Alex',
  	age: req.body.age
  }

  var ret = {
  	state: 'ok',
  	data: 'setting success'
  }

  res.send(ret);
});

module.exports = router;
