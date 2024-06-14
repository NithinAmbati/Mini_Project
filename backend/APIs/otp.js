const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithinambati9@gmail.com",
    pass: "nshv cokv qdpw pdzi",
  },
});

router.post("/send", (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore.set(email, otp);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Error sending email", error });
    }
    res.status(200).send({ message: "OTP sent" });
  });
});

router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (storedOtp === otp) {
    otpStore.delete(email); // Invalidate OTP after successful verification
    res.status(200).send({ message: "OTP verified" });
  } else {
    res.status(400).send({ message: "Invalid OTP" });
  }
});

module.exports = router;
