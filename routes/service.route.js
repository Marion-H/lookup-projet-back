const express = require("express");

const service = express.Router();

const Service = require("../model/service.model");

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");
const auth = require("../middlewares/auth");

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

service.post("/",auth, async (req, res) => {
  const { title, description, logo } = req.body;
  try {
    const services = await Service.create({
      title,
      description,
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


service.put(
  "/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
    const { title, description, logo } = req.body;

    try {
      const service = await Service.update(
        { title, description, logo },
        { where: { uuid } }
      );

      res.status(204).json(service);
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: "invalid request",
      });
    }
  }
);

service.delete(
  "/:uuid",
  auth,
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const { uuid } = req.params;
    try {
      const service = await Service.destroy({ where: { uuid } });

      res.status(204).json(service);
    } catch (err) {
      res.status(404).json({
        status: "error",
        message: "service not found",
      });
    }
  }
);

module.exports = service;
