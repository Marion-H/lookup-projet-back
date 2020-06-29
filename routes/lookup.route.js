const express = require("express");

const lookup = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Lookup = require("../model/lookUp.model");

lookup.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const lookup = await Lookup.findByPk(uuid);
    res.status(200).json(lookup);
  } catch (error) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

lookup.post("/", async (req, res) => {
  const {
    companyName,
    streetNumber,
    streetName,
    postalCode,
    city,
    email,
    phone,
    siret,
    password,
  } = req.body;
  try {
    const lookup = await Lookup.create({
      companyName,
      streetNumber,
      streetName,
      postalCode,
      city,
      email,
      phone,
      siret,
      password,
    });
    res.status(201).json(lookup);
  } catch (error) {
    res.status(422).json({
      status: "error",
      message: error,
    });
  }
});

module.exports = lookup;
