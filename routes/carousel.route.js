const express = require("express");

const carousel = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Carousel = require("../model/carousel.model");



carousel.get("/", async (req, res) => {
  const carousels = await Carousel.findAll();
  try {
    res.status(200).json(carousels);
  } catch (err) {
    res.status(400).json(err);
  }
});

carousel.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp),async (req, res) => {
  const uuid = req.params.uuid;
  try{
      const carousel = await Carousel.findOne({ where: {uuid}})
      res.status(200).json(carousel)
  }catch(err){
    res.status(422).json({
        status: "error",
        message: "invalid request",
      });
  }
});

carousel.post("/", async (req, res) => {
  console.log(req.body);
  const { title, description, link, picture } = req.body;
  try {
    const carousel = await Carousel.create({
      title,
      description,
      link,
      picture,
    });
    res.status(201).json(carousel);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

carousel.put("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const { uuid } = req.params;
  const { title, description, link, picture } = req.body;

  try {
    const carousel = await Carousel.update(
      { title, description, link, picture },
      { where: { uuid } }
    );

    res.status(204).json(carousel);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "invalid request",
    });
  }
});

module.exports = carousel;
