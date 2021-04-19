const express = require('express')
const cors = require('cors');
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

const app = express()
const port = 9000



const SECURE_PATH = './../shared/security/'
const APP_PATH = './../gui/build/'


const database = require('./core/database');

// Webservices
const SecurityWebservice = require('./webservices/security');
const PharmacistWebservice = require('./webservices/pharmacist');




app.use('/security', SecurityWebservice);
app.use('/pharmacist', PharmacistWebservice);



var { encrypt, decrypt} = require(SECURE_PATH +'crypto')

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))
app.use(cookieParser());

app.use(express.static(APP_PATH));


app.get('/database', (req, res) => {


  res.send({da: database()})
})

app.post('/*', (req, res)=> {
  console.log('')
  console.log('***********************************************************')
  console.log('POST: ' + req.url )
  console.log('POST: ' + req.url + ' || ', JSON.stringify( req.body,null,2))

  try {

      req.next()
     } catch(e){
      console.trace(e)
     }
})



app.post('/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password

  if( !(username === 'client1' && password === 'client1')){
    res.status(401).send({
      error: 'usuario y/o contraseña inválidos'
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
    token
  })
})


app.post('/savePhoto', (req, res) => {
  var photo = req.body.photo
  var token = req.body.token

  fs.writeFile(token +".pic", photo,()=>{
    res.send({
      token
    })
  });

})


app.post('/getPhoto', (req, res) => {
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



// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app).listen(port, function(){
  console.log("My HTTPS server listening on port " + port + "...");
});