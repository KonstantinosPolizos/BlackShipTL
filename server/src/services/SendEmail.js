const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports = (email, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const urlToSend = `http://localhost:3000/change-password?token=${token}`;

      const res = await transporter.sendMail({
        from: process.env.NODEMAILER_USERNAME,
        to: email,
        subject: "Password Change Request",
        text: "You've requested a password change. Follow the link below to reset your password.",
        html: `<a href=${urlToSend}>Reset Password</a>`,
      });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
