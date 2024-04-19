const nodeMailer = require("nodemailer");



exports.ContactEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    service: process.env.SMPT_SERVICE,
    port: process.env.SMPT_PORT,
    secure: true,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD
    }
  });


  const mailOptions = {
    from: options.email,
    to: "fa147672@gmail.com",
    subject: "contact From Portfolio",
    text: options,
  };

  await transporter.sendMail(mailOptions);
};
