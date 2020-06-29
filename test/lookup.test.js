const chai = require("chai");
const chaiHttp = require("chai-http");
const Lookup = require("../model/lookUp.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const lookupKeys = [
  "uuid",
  "companyName",
  "streetNumber",
  "streetName",
  "postalCode",
  "city",
  "email",
  "phone",
  "siret",
  "password",
  "createdAt",
  "updatedAt",
];

let lookup;

describe("LOOKUP", () => {
  before(async () => {
    await sequelize.drop()
    await sequelize.init()
    await sequelize.sync();
    

    lookup = await Lookup.create({
      companyName: "Lookup",
      streetNumber: 12,
      streetName: "allée des sabots sans chevaux",
      postalCode: 40200,
      city: "Tarnos",
      email: "anthonin@lookup.com",
      phone: 06,
      siret: "12345678901234",
      password: "toto55",
    });
  });

  describe("get one user", () => {
    it("should return a unique user", async () => {
      try {
        const res = await chai.request(server).get(`/admin/${lookup.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (error) {
        throw error;
      }
    });
  });

  describe("post an user", () => {
    it("should post a unique user", async () => {
      try {
        const res = await chai.request(server).post("/admin").send({
          companyName: "Lookup",
          streetNumber: 12,
          streetName: "allée des sabots sans chevaux",
          postalCode: 40200,
          city: "Tarnos",
          email: "anthonin@lookup.com",
          phone: 06,
          siret: "12345678901234",
          password: "toto55",
        });
        res.should.have.status(201);
        res.should.be.a("object");
        res.body.should.have.keys(lookupKeys);
      } catch (error) {
        throw error;
      }
    });
  });
});
