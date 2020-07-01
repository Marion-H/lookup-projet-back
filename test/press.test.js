const chai = require("chai");
const chaiHttp = require("chai-http");
const Press = require("../model/press.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const pressKey = [
  "uuid",
  "title",
  "description",
  "picture",
  "createdAt",
  "updatedAt",
];

let press;

describe("PRESS", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    press = await Press.create({
      title: "test",
      description: "Loreum ipsum",
      picture: "https://www.test.fr/test.jpg",
    });
  });

  describe("get all press relation", () => {
    it("should return an array of press relation", async () => {
      try {
        const res = await chai.request(server).get("/press");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(pressKey);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get a press relation", () => {
    it("should return an unique press relation", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/press/${press.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });


});
