const express = require("express");

const partenaire = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Partenaire = require("../model/partenaire.model");

const auth = require("../middlewares/auth");

partenaire.get("/", async (req, res) => {
  const partenaires = await Partenaire.findAll();
  try {
    res.status(200).json(partenaires);
  } catch (err) {
    res.status(400).json(err);
  }
});

partenaire.get(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const partenaire = await Partenaire.findByPk(uuid);
      res.status(200).json(partenaire);
    } catch (err) {
      res.status(422).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

partenaire.post("/", auth, async (req, res) => {
  const { link, description, logo } = req.body;
  try {
    const partenaire = await Partenaire.create({
      link,
      description,
      logo,
    });
    res.status(201).json(partenaire);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

partenaire.put(
  "/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
    const { link, description, logo } = req.body;
    try {
      const partenaire = await Partenaire.update(
        { link, description, logo },
        { where: { uuid } }
      );
      res.status(204).json(partenaire);
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

partenaire.delete(
  "/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
    try {
      const partenaire = await Partenaire.destroy({ where: { uuid } });

      res.status(204).json(partenaire);
    } catch (err) {
      res.status(404).json({
        status: "error",
        message: "partenaire not found",
      });
    }
  }
);

module.exports = partenaire;
