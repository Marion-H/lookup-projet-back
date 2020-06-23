const express = require("express");

const product_info = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const ProductInfo = require("../model/product_info.model");

product_info.get("/", async (req, res) => {
  const products = await ProductInfo.findAll();
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

product_info.get(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const products = await ProductInfo.findOne({ where: { uuid } });
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

product_info.post("/", async (req, res) => {
  const { title, description, picture, picture2, picture3 } = req.body;
  try {
    const products = await ProductInfo.create({
      title,
      description,
      picture,
      picture2,
      picture3,
    });
    res.status(201).json(products);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = product_info;
