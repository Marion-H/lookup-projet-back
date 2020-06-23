const chai = require("chai")
const chaiHttp = require("chai-http")
const ProductInfo = require("../model/product_info.model")

let should = chai.should();

let server = require("../index")

const sequelize = require("../sequelize")

chai.use(chaiHttp);

const product_info_key = [
    "uuid",
    "title",
    "description",
    "picture",
    "picture2",
    "picture3",
    "createdAt",
    "updatedAt",
]

let productInfo;

describe("PRODUCT INFO", () => {
    before(async () => {
      await sequelize.sync({ force: true });
  
      product = await ProductInfo.create({
        title: "test",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        picture: "https//www.test.fr/test.jpg",
        picture2: "https//www.test.fr/test.jpg",
        picture3: "https//www.test.fr/test.jpg",
      });
    });

    describe("get all product info", () => {
        it("should return an array of products info", async () => {
          try {
            const res = await chai.request(server).get("/products_info");
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body[0].should.have.keys(product_info_key);
            res.body.length.should.be.eql(1);
          } catch (err) {
            throw err;
          }
        });
      });

});