const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
         user: process.env.SMTP_AUTH_USER,
         pass: process.env.SMTP_AUTH_PASS,
      },
   });

   const message = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
   };

   await transporter.sendMail(message);
};

module.exports = sendEmail;
