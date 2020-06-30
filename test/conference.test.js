const chai = require("chai");
const chaiHttp = require("chai-http");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const Conference = require("../model/conference.model");

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

describe("CONFERENCE", () => {
  before(async () => {
    await sequelize.sync({ force: true });

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
        const res = await chai.request(server).post("/conferences").send({
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
        const res = await chai.request(server).post("/conferences").send({
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
  

});
