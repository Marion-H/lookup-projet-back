const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const lookup = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");
const auth = require("../middlewares/auth");

const Lookup = require("../model/lookUp.model");

lookup.get("/", async (req, res) => {
  try {
    const lookupRes = await Lookup.findAll();
    res.status(200).json(lookupRes);
  } catch (error) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

lookup.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const lookupRes = await Lookup.findByPk(uuid);
    res.status(200).json(lookupRes);
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
      where: { email },
      defaults: { password },
    });
    res.status(201).end();
  } catch (error) {
    res.status(422).json(error.message);
  }
});

lookup.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const lookupRes = await Lookup.findOne({ where: { email } });
    if (lookupRes.validatePassword(password)) {
      const token = jwt.sign(
        {
          id: lookupRes.dataValues.uuid,
          email: lookupRes.dataValues.email,
        },
        process.env.secret,
        { expiresIn: "1h" }
      );
      const uuid = lookupRes.uuid;
      console.log(token)
      res.status(201).json({ token, uuid });
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
      email,
      password,
      phone,
      siret,
    } = req.body;
    try {
      const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync());
      const lookupRes = await Lookup.update(
        {
          companyName,
          streetName,
          streetNumber,
          postalCode,
          city,
          email,
          password: passHash,
          phone,
          siret,
        },
        { where: { uuid } }
      );
      res.status(201).json(lookupRes);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

module.exports = lookup;
