/*
 * CS3099 Group A3
 */

process.env.SMTP_HOST = "smtp.ethereal.email";
process.env.SMTP_PORT = "587";
process.env.SMTP_USERNAME = "rogers.price3@ethereal.email";
process.env.SMTP_PASSWORD = "YwgzQrmK2gemUfR63g";

//import { getTestMessageUrl } from "nodemailer";
import { emailTransporter } from "./email";

test("Correct type", async () => {

  const info = await emailTransporter.sendMail({
    from: "sender@server.com",
    to: "receiver@sender.com",
    subject: "Message title",
    text: "Plaintext version of the message",
  });

  expect(info.response).toMatch(/^250 Accepted/);
});
