const express = require("express");

const conference = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Conference = require("../model/conference.model");

conference.get("/", async (req, res) => {
  const conferences = await Conference.findAll();
  try {
    res.status(200).json(conferences);
  } catch (err) {
    res.status(400).json(err);
  }
});

conference.get(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const conferences = await Conference.findOne({ where: { uuid } });
      res.status(200).json(conferences);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

conference.post("/", async (req, res) => {
  const { title, subject, date, picture } = req.body;
  try {
    const conferences = await Conference.create({
      title,
      subject,
      date,
      picture,
    });
    res.status(201).json(conferences);
  } catch (error) {
    res.status(422).json({
        status: "error",
        message: "invalid request",
      });
  }
});

module.exports = conference;
