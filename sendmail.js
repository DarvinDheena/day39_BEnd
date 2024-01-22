const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'darvindheena98@gmail.com',
      pass: 'gyuofwnzpzukmjnq',
    },
  });

  const sendMail = async () => {
    const info = await transporter.sendMail({
      from: `"Hemamalini Kamaraj" <darvindheena98@gmail.com>`,
      to: 'omsakthiengg2019@gmail.com',
      subject: "Reset Password",
      text: `Kindly use this link to reset the password - `,
    });
  };
  sendMail();