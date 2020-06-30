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

module.exports = conference;