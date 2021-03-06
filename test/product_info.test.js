const chai = require("chai");
const chaiHttp = require("chai-http");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken")

chai.use(chaiHttp);

const ProductInfo = require("../model/product_info.model");
const Product = require("../model/product.model");
const Lookup = require("../model/lookUp.model")

const product_info_key = [
  "uuid",
  "title",
  "description",
  "description2",
  "description3",
  "picture",
  "picture2",
  "picture3",
  "createdAt",
  "updatedAt",
  "ProductUuid",
  "Product",
];

const productKey = [
  "uuid",
  "name",
  "price",
  "description",
  "picture",
  "createdAt",
  "updatedAt",
];

const product_info_sample = {
  title: "test",
  description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  picture: "https//www.test.fr/test.jpg",
  picture2: "https//www.test.fr/test.jpg",
  picture3: "https//www.test.fr/test.jpg",
  description2: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  description3: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
};

const product_sample = {
  name: "test",
  price: "10.5",
  description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  picture: "https//www.test.fr/test.jpg",
};

let productInfo;
let product;

let token;


describe("PRODUCT INFO", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    admin = await Lookup.create({
      email: "anthonin64@lookup.fr",
      password: "toto",
    });
    token = jwt.sign(
      {
        id: admin.dataValues.uuid,
        email: admin.dataValues.email,
      },
      process.env.secret,
      { expiresIn: "1h" }
    );

    product = await Product.create(product_sample);
    productInfo = {
      ...product_info_sample,
      ProductUuid: product.uuid,
    };

    productInfos = await ProductInfo.create(productInfo);
  });

  describe("get all product info", () => {
    it("should return an array of products info", async () => {
      try {
        const res = await chai.request(server).get("/products_info");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        res.body[0].should.have.keys(product_info_key);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get unique product info", () => {
    it("should return an unique product info", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/products_info/${productInfos.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(product_info_key);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a new product info", () => {
    it("should create a new product info", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/products_info")
          .set("Authorization", ` Bearer ${token}`)
          .send({
            ...product_info_sample,
            ProductUuid: product.uuid,
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("modify a product info", () => {
    it("should modify a product info", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/products_info/${productInfos.uuid}`)
          .set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a single product", () => {
    it("should delete a single product info", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/products_info/${productInfos.uuid}`).set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
      } catch (err) {
        throw err;
      }
    });
  });
});
