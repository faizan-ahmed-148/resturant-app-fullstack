const nodemailer = require("nodemailer")

exports.sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        service: process.env.SMPT_SERVICE,
        port: process.env.SMPT_PORT,
        secure: true,
        auth:{
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

    }

