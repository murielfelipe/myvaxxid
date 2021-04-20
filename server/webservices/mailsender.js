var Nodemailer = require('nodemailer')
var Moment = require('moment')


const Sender =  function(qrCode, email, patient){

    // Moment.locale('es')

    // this.dateFormat = 'dddd, D [de] MMMM [de] YYYY, h:mm a'

    let smtpConfig = {     
     host: 'cps.suprix.com',      
     port: 465,      
     secure: true,      
     auth: {          
      user: 'myvaxxid@sys-group.net',          
      pass: ''      
      },
      debug: true    
    }

    this.transporter = Nodemailer.createTransport(smtpConfig)
    
    this.mailOptions = {
      from: 'myvaxxid@sys-group.net',
      subject: 'MyvaxxID'+ Math.ceil((Math.random()* 1000)),
      attachments: [
        {
            path: qrCode,
            cid: 'qrcode'
        }, {
          path: 'data:image/png;base64,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',
          cid: 'logocompany'
        }       
      ],
    }



    let template = `
      

      <html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible"
    content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
    <title>MyvaxxID</title>
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <title></title>

    <style type="text/css">

        .container {
            width: 480px;
            margin: 60px auto 0 auto;
            background: #fff;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
            padding-bottom: 0;
            box-shadow: 0 2px 5px #0003;
        }

        .logo-company {
            width: 120px;
            float: right;
        }
        

        @media (max-width: 600px) {
             .container {
                 width: 280px;
                margin: 0 auto 0 auto;
            }
        }

    </style>
</head>
<body style="
    background: #f7f7f7;
    font-family: sans-serif;
    font-size: 14px;
">
<br>

<div class="container">

<img class="logo-company" src="cid:logocompany">




    <h1 style="
    color: #15c3ee;
">Successful registration!</h1>
<hr style="display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0; ">
<p>Below you will find the QR code linked to your vaccine information.</p>     
<p>Upon request, please present this code to be scanned to confirm vaccination</p>  
<br>
<p><b>Patient:</b> ${patient}</p>
<br>

<br>
<img src="cid:qrcode"></img>
<br>
<br>


<p><small>
    If you think you have received this message in error, please contact customer service at <a href="https://myvaxxid.com" target="_blank" >https://myvaxxid.com</a></small>
</p>
<br>


<p> Thank you for being apart of MyVaxxID and for helping keep the world safe for you and for others.</p>

<p>
    <b>Regards,</b>
    <br>
    <b>MyvaxxID team</b>
</p>



<br>

</div>

<div  style="
  
    margin: 0px auto;
    background: rgb(245, 245, 245);
    padding: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    color: #888;
" class="container">
Note: do not reply to this email, this is only for a notification delivery, it is not reviewed by a person. If you have any questions, please contact us through our website: https://myvaxxid.com</div>


<br>
<br>

</body>
</html>

    `

    let chatMailOptions = Object.assign({}, this.mailOptions)
    chatMailOptions.html = template

    chatMailOptions.to = email
    chatMailOptions.to = 'felipemuriel@sys-group.net'

    try {
      this.transporter.sendMail(chatMailOptions)
      console.log('EMAIL SENT', chatMailOptions)
      return true
    } catch(err) {
      console.error('Error sending email: ', err)
      return false
    }

}

module.exports = Sender