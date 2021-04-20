const express = require('express')
const cors = require('cors');
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

const app = express()
const port = 9000



const APP_PATH = './../gui/build/'



// congfig
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit:'10mb'}))
app.use(cookieParser());
app.use(express.static(APP_PATH));
// congfig


// viewer all parmas request 
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


// Webservices
const SecurityWebservice = require('./webservices/security');
app.use('/security', SecurityWebservice);

const PharmacistWebservice = require('./webservices/pharmacist');
app.use('/pharmacist', PharmacistWebservice);

const CheckerWebservice = require('./webservices/checker');
app.use('/checker', CheckerWebservice);


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app).listen(port, function(){
  console.log("My HTTPS server listening on port " + port + "...");
});