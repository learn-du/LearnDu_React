const transporter = require("./utils/sendemail.js");

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "recipient@example.com",
      subject: "Test Email",
      text: "This is a test email from Nodemailer.",
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendTestEmail();
