const chai = require("chai");
const chaiHttp = require("chai-http");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const Conference = require("../model/conference.model");
const Lookup = require("../model/lookUp.model");

const conferenceKey = [
  "uuid",
  "title",
  "subject",
  "date",
  "picture",
  "createdAt",
  "updatedAt",
];

let conference;

let token;

describe("CONFERENCE", () => {
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

    conference = await Conference.create({
      title: "test",
      subject: "Loreum ipsum",
      date: "1990-05-28",
      picture: "https://www.test.fr/test.jpg",
    });
  });

  describe("get all conference", () => {
    it("should return an array of conference", async () => {
      try {
        const res = await chai.request(server).get("/conferences");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(conferenceKey);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get a conference", () => {
    it("should return an unique conference", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/conferences/${conference.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a conference", () => {
    it("should post new conference", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/conferences")
          .set("Authorization", ` Bearer ${token}`)
          .send({
            title: "test",
            subject: "Loreum ipsum",
            date: "1990-05-28",
            picture: "https://www.test.fr/test.jpg",
          });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(conferenceKey);
      } catch (err) {
        throw err;
      }
    });
    it("should fail to create", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/conferences")
          .set("Authorization", ` Bearer ${token}`)
          .send({
            titl: "test",
          });
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.keys(["status", "message"]);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("put a conference", () => {
    it("should put a conference", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/conferences/${conference.uuid}`)
          .set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a conference", () => {
    it("should delete a single conference", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/conferences/${conference.uuid}`)
          .set("Authorization", ` Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
