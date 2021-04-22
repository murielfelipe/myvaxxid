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



router.post('/getVaccine', function(req, res) {

	VaccineModel.findAll().then((vaccines=>{
		res.send({
			vaccines: vaccines
		});
	}))


});

router.post('/savePhoto', (req, res) => {
  var photo = req.body.photo
  var token = req.body.token

  fs.writeFile(token +".pic", photo,()=>{
    res.send({
      token
    })
  });

})


router.post('/getPhoto', (req, res) => {
  var token = req.body.token

  fs.readFile(token +".pic",'utf8',  (err, data) => {
    if (err) {
      res.send({
        result: 'fail',
        photo: data,
      })

    } else {

      fs.unlink(token +".pic",(err, data) => {});

      res.send({
        photo: data,
        result: 'ok',
      })
    }
  });

})


router.post('/saveData', (req, res) => {

  var valuename = req.body.valuename; 
  var valuecardid = req.body.valuecardid; 
  var valueemail = req.body.valueemail; 
  var valuephone = req.body.valuephone; 
  var valuebirth = req.body.valuebirth; 
  var valuevaccine = req.body.valuevaccine; 
  var valuelotnumber = req.body.valuelotnumber; 
  var valuephoto = req.body.valuephoto; 

  

  VaccineModel.findOne({where:{ id: valuevaccine}}).then((vaccine=>{
    let valueNonce = crypto.randomBytes(32).toString('hex');
    let patient = {
        name: valuename,
        HealthCardID: valuecardid,
        Email: valueemail,
        Phone: valuephone,
        PhotoURL: '',
        DateOfBird: valuebirth,
        VaccineId: valuevaccine,
        LotNumber: valuelotnumber,

        ProductName: vaccine.dataValues.productName,
        manufacturer: vaccine.dataValues.manufacturer,
        quantityDose: 1,
        doseNumber: 1,
        
        inmunityDate: moment().format('YYYY-MM-DD'),
        vaccinationDate: moment().add(vaccine.dataValues.inmunityDate, 'days').format('YYYY-MM-DD'),
        nonceNumber: valueNonce,
    }
    
    let hash = generate(patient)

    console.log(hash)

    patient.hash = hash

    fs.writeFile(valueNonce , valuephoto,()=>{});


    QRCode.toDataURL(valueNonce, { errorCorrectionLevel: 'H' }, function (err, url) {
      console.log(url)
      console.log(err)

      

      Sender(url, valueemail, patient.name)

    })


    Patientdata.create(patient).then(state=>{
      res.send({
        result: 'ok',
      })
    })





  }))



 
})



module.exports = router