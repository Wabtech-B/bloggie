import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { PasswordResetEmail } from "@/emails/password-reset-email";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

const url =
  process.env.NODE_ENV === "production"
    ? "https://bloggie.vercel.app"
    : "http://localhost:3000";

export const sendPasswordResetLink = async (email: string, token: string) => {
  const resetLink = `${url}/reset-password?email=${email}&token=${token}`;
  const emailHtml = render(PasswordResetEmail({ url: resetLink }));

  const mailOptions = {
    from: "wabtech.tech@gmail.com",
    to: email,
    subject: "Password Reset",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset link sent successfully");
  } catch (error) {
    console.error("Error sending password reset link:", error);
    throw error;
  }
};
