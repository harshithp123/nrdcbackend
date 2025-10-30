import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465 SSL
  auth: {
    user: "subhashvarmakolanada@gmail.com", // full Gmail address
    pass: "kmnu rocs iyvu kbgb", // 16-char App Password
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"MCP Admin" <lallipriya2003@gmail.com>`,
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export default sendMail;
