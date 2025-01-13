const nodemailer = require('nodemailer');

const sendVerificationEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // Ethereal SMTP server
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER, // Ethereal email address
      pass: process.env.EMAIL_PASS, // Ethereal password
    },
  });

  const mailOptions = {
    from: `"Dental App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <h1>Welcome to Dental App!</h1>
      <p>To verify your email address, please click the link below:</p>
      <a href="http://localhost:8082/auth/verify-email?token=${verificationToken}">
        Verify Email
      </a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // Ethereal-specific
    }
  });
};

module.exports = sendVerificationEmail;
