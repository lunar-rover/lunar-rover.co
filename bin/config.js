const aws = require('aws-sdk');

// Set the region
aws.config.update({region: 'us-east-1'});

const config = {
    db: {
        // TODO
    },
    email: {
        mailTo: 'info@lunar-rover.co',
        nodemailer: {
            debug: true,
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        }
    }
}

module.exports = config;
