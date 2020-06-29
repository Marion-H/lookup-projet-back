const express = require("express");

const product_info = express.Router();

const regExpIntegrityCheck = require("../middlewares/regexCheck");
const { uuidv4RegExp } = require("../middlewares/regexCheck");

const ProductInfo = require("../model/product_info.model");
const Product = require("../model/product.model")

product_info.get("/", async (req, res) => {
  const products = await ProductInfo.findAll({include : {model : Product}});
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
  const { title, description, picture, picture2, picture3 ,ProductUuid} = req.body;
  try {
    const products = await ProductInfo.create({
      title,
      description,
      picture,
      picture2,
      picture3,
      ProductUuid
    });
    res.status(201).json(products);
  } catch (error) {
    res.status(422).json(error);
  }
});

product_info.put(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    const { title, description, picture, picture2, picture3 } = req.body;
    try {
      await ProductInfo.update(
        {
          title,
          description,
          picture,
          picture2,
          picture3,
        },
        { where: { uuid } }
      );
      res.status(204).end();
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

product_info.delete(
  "/:uuid",
  regExpIntegrityCheck(uuidv4RegExp),
  async (req, res) => {
    const uuid = req.params.uuid;
    try {
      await ProductInfo.destroy({ where: { uuid } });
      res.status(204).end();
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }
  }
);

module.exports = product_info;
