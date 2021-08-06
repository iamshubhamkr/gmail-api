require('dotenv').config()
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
  
app.use(express.static("public"));

//setup your gmail api credentials
const auth = {
    type: 'oauth2',
    user: process.env.GMAIL_ADDRESS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

//api endpoint
app.post('/send', function(req, res){
    response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
    
    //compose the message
    let mailOptions = {
        from: req.body.name,
        to: response.email,
        subject: 'Message from: ' + req.body.name,
        text: req.body.message,
        html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };
    // create transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });
    //send mail using transporter object

  transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
  });

  // start the server
  app.listen(3000,()=> {
      console.log("Server is running at port 3000.....");
  });