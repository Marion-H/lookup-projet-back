const chai = require("chai");
const chaiHttp = require("chai-http");
const Product = require("../model/product.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const productKey = [
  "uuid",
  "name",
  "price",
  "description",
  "picture",
  "createdAt",
  "updatedAt",
];

let product;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4NjQ3NGFjLTM5MDItNDRlYS05YjQyLTdkMTllNDRlYWViZiIsImVtYWlsIjoiYW50aG9uaW42NEBsb29rdXAuZnIiLCJpYXQiOjE1OTM2NzcxMDYsImV4cCI6MTU5MzY4MDcwNn0.xxz9C5g-gMnHwXRHJSzl8TQggSURoDlZ6UiE8csEEq0";

describe("PRODUCT", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    product = await Product.create({
      name: "test",
      price: "10.5",
      description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      picture: "https//www.test.fr/test.jpg",
    });
  });

  describe("get all product", () => {
    it("should return an array of products", async () => {
      try {
        const res = await chai.request(server).get("/products");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(productKey);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get unique product", () => {
    it("should return an unique product", async () => {
      try {
        const res = await chai.request(server).get(`/products/${product.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(productKey);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a new product", () => {
    it("should create a new product", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/products")
          .set("Authorization", ` Bearer ${token}`)
          .send({
            name: "test2",
            price: "13",
            description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
            picture: "https//www.test.fr/test2.jpg",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(productKey);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("modify a product", () => {
    it("should modify a product", async () => {
      try {
        const res = await chai.request(server).put(`/products/${product.uuid}`).set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a single product", () => {
    it("should delete a single product", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/products/${product.uuid}`).set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
