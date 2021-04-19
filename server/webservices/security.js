var express = require('express');
var router = express.Router();

// database
var UserModel = require('./../models/user');
var VaccineModel = require('./../models/vaccine');


router.get('/saveUser', function(req, res) {


	UserModel.create({
		firstName: 'asfdasfasf',
		lastName: 'lastNamesfdsdf',
	})



  res.send({
  	UserModel
  });
});




module.exports = router