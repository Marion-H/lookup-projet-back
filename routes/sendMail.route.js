const express = require("express");

const nodemailer = require("nodemailer");

require("dotenv").config();

const sendMail = express.Router();

const { USERMAIL, PASSMAIL } = process.env;

const transport = {
  service: "gmail",
  auth: {
    user: USERMAIL,
    pass: PASSMAIL,
  },
};

const smtpTransport = nodemailer.createTransport(transport);

sendMail.post("/", async (req, res) => {
  const { message, emailFrom, subject, emailTo, html, quantity } = req.body;
  const emailOption = {
    from: emailFrom,
    to: emailTo,
    subject: subject,
    text: message,
    html,
  };

  try {
    await smtpTransport.sendMail(emailOption, (err, data) => {
      if (err) {
        console.log("error:", err);
      } else {
        console.log("ok");
      }
    });
    res.status(201).send("email Send");
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = sendMail;
