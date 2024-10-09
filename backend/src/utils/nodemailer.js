import nodemailer from "nodemailer";

const sendEmail = async (email, message) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        service: process.env.NODEMAILER_SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Email Verification",
        text: message,
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };

export { sendEmail };