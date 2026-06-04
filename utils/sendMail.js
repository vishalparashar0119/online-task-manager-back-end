import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, text) {
    console.log('send mail function runnidng')
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
}

export default sendEmail;
