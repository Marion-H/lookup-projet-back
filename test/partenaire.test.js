const chai = require("chai");
const chaiHttp = require("chai-http");
const Partenaire = require("../model/partenaire.model");
const Lookup = require("../model/lookUp.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

const partenaireKey = [
  "uuid",
  "link",
  "description",
  "logo",
  "createdAt",
  "updatedAt",
];

let partenaire;
let token;

describe("PARTENAIRE", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    const admin = await Lookup.create({
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

    partenaire = await Partenaire.create({
      link: "test",
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
        const res = await chai
          .request(server)
          .post("/partenaires")
          .set("Authorization", `Bearer ${token}`)
          .send({
            link: "test",
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
        const res = await chai
          .request(server)
          .post("/partenaires")
          .set("Authorization", `Bearer ${token}`)
          .send({
            link: "test",
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

  describe("put a partenaire", () => {
    it("should put a partenaire", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/partenaires/${partenaire.uuid}`)
          .set("Authorization", `Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a partenaire", () => {
    it("should delete a single partenaire", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/partenaires/${partenaire.uuid}`)
          .set("Authorization", `Bearer ${token}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
