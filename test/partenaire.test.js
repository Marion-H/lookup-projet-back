const chai = require("chai");
const chaiHttp = require("chai-http");
const Partenaire = require("../model/partenaire.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const partenaireKey = [
  "uuid",
  "title",
  "description",
  "logo",
  "createdAt",
  "updatedAt",
];

describe("PARTENAIRE", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    partenaire = await Partenaire.create({
      title: "test",
      description: "Loreum ipsum",
      logo: "https://www.test.fr/test.jpg",
    });
  });

  describe("get all partenaire", () => {
    it("should return an array of partenaire", async () => {
      try {
        const res = await chai.request(server).get("/partenaires");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(partenaireKey);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get a partenaire", () => {
    it("should return an unique partenaire", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/partenaires/${partenaire.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a partenaire", () => {
    it("should post new partenaire", async () => {
      try {
        const res = await chai.request(server).post("/partenaires").send({
          title: "test",
          description: "Loreum ipsum",
          logo: "https://www.test.fr/test.jpg",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(partenaireKey);
      } catch (err) {
        throw err;
      }
    });
    it("should fail to create", async () => {
      try {
        const res = await chai.request(server).post("/partenaires").send({
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
});
