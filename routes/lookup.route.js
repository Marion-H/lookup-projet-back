const express = require("express");

const lookup = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");
const auth = require("../middlewares/auth");

const Lookup = require("../model/lookUp.model");

lookup.get(
  "/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
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
  }
);

lookup.post("/", auth, async (req, res) => {
  const { email, password } = req.body;
  try {
    const lookup = await Lookup.findOrCreate({
      where: { email },
      defaults: { password },
    });
    res.status(201).send(lookup);
  } catch (error) {
    res.status(422).json(error.message);
  }
});

lookup.post("/login", auth, async (req, res) => {
  const { email, password } = req.body;
  try {
    const lookup = await Lookup.findOne({ where: { email } });
    if (lookup.validatePassword(password)) {
      const token = jwt.sign(
        {
          id: lookup.dataValues.uuid,
          email: lookup.dataValues.email,
        },
        process.env.secret,
        { expiresIn: "1h" }
      );
      res.status(201).json({ token });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

lookup.put(
  "/login/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
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
      res.status(201).json(lookup);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = lookup;
