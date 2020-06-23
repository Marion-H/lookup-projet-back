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
    it("should an array of products", async () => {
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
});
