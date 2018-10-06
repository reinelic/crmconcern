var nodemailer = require("nodemailer");
var juice = require("juice");
var htmltoText = require("html-to-text");
const promisify = require("es6-promisify");

nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Office 365 server
        port: 587,     // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: 'alice.iramurikiye@concern.net',
            pass: 'C0ncern8'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
       

    // setup email data with unicode symbols
    
    exports.send= (options) =>{
      let mailOptions = {
        from: 'alice.iramurikiye@concern.net', // sender address
        to: options.user, // list of receivers
        subject: options.subject,// Subject line
        text: 'Une Plainte vient de vous etre assignée veuillez accéder au plateforme...', // plain text body
        html: '<b>Hello world?</b>' // html body
    };  
    
    
         return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
    
    
    
    }
    

    // send mail with defined transport object
    
   
    
    
   
    
    
    
    
  
});


    
   


