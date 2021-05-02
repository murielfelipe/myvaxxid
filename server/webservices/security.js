var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

// database
var UserModel = require('./../models/user');
var VaccineModel = require('./../models/vaccine');
var { encrypt, decrypt} = require('./../shared/security/crypto')


router.get('/saveUser', function(req, res) {


	UserModel.create({
		firstName: 'asfdasfasf',
		lastName: 'lastNamesfdsdf',
	})

  res.send({
  	UserModel
  });
});


router.post('/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password

  if( !(password === 'client1')){
    res.send({
      error: 401
    })
    return
  }




  var tokenData = {
    username: username
    // ANY DATA
  }


  let data = encrypt(JSON.stringify(tokenData))

  var token = jwt.sign(data, 'Secret Password', {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  })

  res.send({
    token,
    rol: username === '' ? 'patient': 'check'
  })
})





module.exports = router
