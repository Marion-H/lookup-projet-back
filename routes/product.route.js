const express = require("express");

const product = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const Product = require("../model/product.model");

product.get("/", async (req, res) => {
  const products = await Product.findAll();
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

product.get("/:uuid", regExpIntegrityCheck(uuidv4RegExp), async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const products = await Product.findOne({ where: { uuid } });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
});

product.post("/", async (req, res) => {
  const { name, price, description, picture } = req.body;
  try {
    const products = await Product.create({
      name,
      price,
      description,
      picture,
    });
    res.status(201).json(products);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = product;
