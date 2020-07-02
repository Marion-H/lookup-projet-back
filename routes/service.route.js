const express = require("express");

const service = express.Router();

const Service = require("../model/service.model");

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

service.get("/", async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json(err);
  }
});

service.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const services = await Service.findByPk(uuid);
    res.status(200).json(services);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

service.post("/", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const { title, desciption, logo } = req.body;
  try {
    const services = await Service.create({
      title,
      desciption,
      logo,
    });
    res.status(201).json(services);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

module.exports = service;
