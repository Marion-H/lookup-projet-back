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

module.exports = product;
