const chai = require("chai");
const chaiHttp = require("chai-http");
const Service = require("../model/service.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

let service;

const serviceKeys = ["uuid", "title", "description", "logo"];

describe("SERVICE", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    service = await Service.create({
      title: "test",
      description: "blablablbla",
      logo: "http://image.jpg",
    });
  });

  describe("get all services", () => {
    it("should return an array of services", async () => {
      try {
        const res = await chai.request(server).get("/services");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(serviceKeys);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
});
