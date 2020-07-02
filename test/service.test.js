const chai = require("chai");
const chaiHttp = require("chai-http");
const Service = require("../model/service.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

let service;

const serviceKeys = [
  "uuid",
  "title",
  "description",
  "logo",
  "createdAt",
  "updatedAt",
];

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
  describe("get one service", () => {
    it("should return one service", async () => {
      try {
        const res = await chai.request(server).get(`/services/${service.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post one service", () => {
    it("should post a new service", async () => {
      try {
        const res = await chai
          .request(server)
          .post(`/services`)
          .send({ title, desciption, logo });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(serviceKeys);
      } catch (err) {
        throw err;
      }
    });
  });
});
