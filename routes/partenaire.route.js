const express = require("express");

const partenaire = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Partenaire = require("../model/partenaire.model")

partenaire.get("/", async (req, res) => {
    const partenaires = await Partenaire.findAll();
    try {
      res.status(200).json(partenaires);
    } catch (err) {
      res.status(400).json(err);
    }
  });





module.exports = partenaire;