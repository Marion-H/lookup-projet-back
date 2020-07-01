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

press.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const pressR = await Press.findByPk(uuid);
    res.status(200).json(pressR);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

press.post("/", async (req, res) => {
    console.log(req.body);
    const { title, description, picture } = req.body;
    try {
      const pressR = await Press.create({
        title,
        description,
        picture,
      });
      res.status(201).json(pressR);
    } catch (err) {
      res.status(422).json({
        status: "error",
        message: "invalid request",
      });
    }
  });

module.exports = press;
