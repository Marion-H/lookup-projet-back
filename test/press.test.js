const chai = require("chai");
const chaiHttp = require("chai-http");
const Press = require("../model/press.model");
const Lookup = require("../model/lookUp.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

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
let token;

describe("PRESS", () => {
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
        const res = await chai.request(server).get(`/press/${press.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a press relation", () => {
    it("should post new press relation", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/press")
          .set("Authorization", ` Bearer ${token}`)
          .send({
            title: "test",
            description: "Loreum ipsum",
            picture: "https://www.test.fr/test.jpg",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(pressKey);
      } catch (err) {
        throw err;
      }
    });
    it("should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/press")
          .set("Authorization", ` Bearer ${token}`)
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

  describe("put a press relation", () => {
    it("should put a press relation", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/press/${press.uuid}`)
          .set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a press relation", () => {
    it("should delete a press relation", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/press/${press.uuid}`)
          .set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
