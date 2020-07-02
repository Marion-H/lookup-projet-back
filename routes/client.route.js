const express = require("express");

const client = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Client = require("../model/client.model");

client.get("/", async (req, res) => {
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
    const client = await Client.findByPk(uuid);
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
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

client.put(
  "/:uuid",

  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
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
      const client = await Client.update(
        {
          companyName,
          streetNumber,
          streetName,
          city,
          postalCode,
          email,
          phone,
          siret,
        },
        { where: { uuid } }
      );

      res.status(204).json(client);
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

client.delete(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
    try {
      const client = await Client.destroy({ where: { uuid } });

      res.status(204).json(client);
    } catch (err) {
      res.status(404).json({
        status: "error",
        message: "client not found",
      });
    }
  }
);

module.exports = client;
