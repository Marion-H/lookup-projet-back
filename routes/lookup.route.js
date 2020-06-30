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
  const { email, password } = req.body;
  try {
    const lookup = await Lookup.findOrCreate({
      where: { email, password },
      default: {},
    });
    res.status(201).json(lookup);
  } catch (error) {
    res.status(422).json(error);
  }
});

lookup.put("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const { uuid } = req.params;
  const {
    companyName,
    streetName,
    streetNumber,
    postalCode,
    city,
    phone,
    siret,
  } = req.body;
  try {
    const lookup = await Lookup.update(
      {
        companyName,
        streetName,
        streetNumber,
        postalCode,
        city,
        phone,
        siret,
      },
      { where: { uuid } }
    );
    res.status(204).json(lookup);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = lookup;
