const express = require("express");

const client = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Client = require("../model/client.model");

client.get("/", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  try {
    const client = await Client.findAll();
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

client.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const { uuid } = req.params;
  try {
    const client = await Client.findOne({ where: { uuid } });
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

client.post("/", async (req, res) => {
  const {
    companyName,
    streetNumber,
    streetName,
    city,
    postalCode,
    email,
    phone,
    siret,
  } = req.body;
  try {
    const client = await Client.create({
      companyName,
      streetNumber,
      streetName,
      city,
      postalCode,
      email,
      phone,
      siret,
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

module.exports = client;
