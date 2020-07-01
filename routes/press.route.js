const express = require("express");

const press = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Press = require("../model/press.model");


press.get("/", async (req, res) => {
    const pressR = await Press.findAll();
    try {
      res.status(200).json(pressR);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = press;