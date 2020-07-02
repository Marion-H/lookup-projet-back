const chai = require("chai");
const chaiHttp = require("chai-http");
const Service = require("../model/service.model");
const Lookup = require("../model/lookUp.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken")

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

let token

describe("SERVICE", () => {
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
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "test",
            description: "blablablbla",
            logo: "http://image.jpg",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(serviceKeys);
      } catch (err) {
        throw err;
      }
    });

    it("should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/services")
          .set("Authorization", `Bearer ${token}`)
          .send({
            title: "test",
          });
        console.log(res.body);
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.keys(["status", "message"]);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("put a service", () => {
    it("should put a service", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/services/${service.uuid}`)
          .set("Authorization", `Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a service", () => {
    it("should delete a single service", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/services/${service.uuid}`)
          .set("Authorization", `Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
