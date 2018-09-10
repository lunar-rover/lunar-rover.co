var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
const config = require("../bin/config");

var smtpTransport = nodemailer.createTransport(config.email.nodemailer);

function sendEmailCallback(error, response) {
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/process-contact', function(req, res, next) {
    if (req.body.name && req.body.email && req.body.message) {
        smtpTransport.sendMail({
            from: config.email.mailTo,
            to: config.email.mailTo,
            subject: 'Feedback from ' + req.body.name + ' ('+req.body.email+')',
            text: req.body.message
        }, sendEmailCallback);

        // TODO: send response email to requester

        res.json({done: true});
    }
    else {
        res.json({error: 'Failed to send your message. Please try again later.'});        
    }
});

module.exports = router;
