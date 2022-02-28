// "use strict";
const express = require('express')
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

const app = express()
app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// static page
// app.get('/',(req,res)=>{
//   res.sendFile(__dirname__,'index.html')
// })

// sending form 
app.post('/send', (req, res)=>{

    console.log(req.body)
    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
 var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  // service: 'gmail',
  auth: {
    user: "8e07c37c4d39b2",
    pass: "4861bc4c19efd4"
  }
});



// console.log(testAccount)

  // send mail with defined transport object
  let mailOptions = {
    from: '"Peter Thomas 👻" <petergod1st@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Hello ✔" + req.body.fname, // Subject line
    text: "You have successfully registered MR/MRS/MISS "+ req.body.fname + " "+ req.body.lname, // plain text body
    html: "<b>You have successfully registered MR/MRS/MISS </b> "+ req.body.fname + " "+ req.body.lname, // html body
  };

 transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});

});

app.listen(port,()=>{
  console.log(` This node app is runing on the port of ${port}`)
})