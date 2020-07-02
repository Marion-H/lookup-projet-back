const express = require("express");

const carousel = express.Router();

const Service = require("../model/service.model");

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

service.get("/", async (req, res) => {
  const service = await service.findAll();
  try {
    res.status(200).json(service);
  } catch (err) {
    res.status(400).json(err);
  }
});
