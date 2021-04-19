var express = require('express');
var router = express.Router();

// database
var UserModel = require('./../models/user');
var VaccineModel = require('./../models/vaccine');


router.get('/getVaccine', function(req, res) {


	let vaccines = VaccineModel.findAll({})

  res.send({
  	vaccines: vaccines
  });
});




module.exports = router