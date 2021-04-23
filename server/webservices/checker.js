var express = require('express');
var router = express.Router();
const fs = require('fs');
const moment = require('moment');
const crypto = require("crypto");

var QRCode = require('qrcode')
var Sender = require( __dirname +'/mailsender')


// database
var UserModel = require('./../models/user');
var VaccineModel = require('./../models/vaccine');
var Patientdata = require('./../models/patientdata');


var { generate } = require('./../shared/security/hash')



router.post('/vaccine', function(req, res) {

  var token = req.body.token

     fs.readFile(token,'utf8',  (err, data) => {
	    if (err) {
			res.send({
				patient: null,
				photo: null,
			});

	    } else {

		Patientdata.findOne({ where: {nonceNumber: token}}).then((patient=>{

			// let hash = generate(patient.dataValues)
   //  		console.log(hash)

   			let today =  parseInt(moment().format('YYYY-MM-DD').replace(/[-]/gmi,''))
   			let inmunity = parseInt(patient.dataValues.inmunityDate.replace(/[-]/gmi,''))


			res.send({
				isValid: inmunity <= today,
				today: today,
				inmunity: inmunity,
				patient: patient,
				photo: data,
			});
		}))
	  }
	});


});




module.exports = router