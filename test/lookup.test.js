const chai = require("chai");
const chaiHttp = require("chai-http");
const Lookup = require("../model/lookUp.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");
const jwt = require("jsonwebtoken");

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
    await sequelize.sync({ force: true });

    lookup = await Lookup.create({
      companyName: "Lookup",
      streetNumber: 12,
      streetName: "allée des sabots sans chevaux",
      postalCode: 40200,
      city: "Tarnos",
      email: "anthonin@lookup.com",
      phone: 0622222222,
      siret: "12345678901234",
      password: "toto",
    });
    admin = await Lookup.create({
      email: "anthonin@lookup.com",
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
  });

  describe("get one user", () => {
    it("should return a unique user", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/admin/${lookup.uuid}`)
          .set("Authorization", `Bearer ${token}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(lookupKeys);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("post an user", () => {
    it("should post a unique user", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/admin")
          .set("Authorization", `Bearer ${token}`)
          .send({
            email: "anthonin@lookup.com",
            password: "toto55",
          });
        res.should.have.status(201);
        res.should.be.a("object");
      } catch (error) {
        throw error;
      }
    });
  });
  describe("update admin profile", () => {
    it("should update the admin profile", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/admin/login/${lookup.uuid}`)
          .set("Authorization", `Bearer ${token}`)
          .send({
            companyName: "Lookup",
            streetNumber: 12,
            streetName: "allée des sabots sans chevaux",
            postalCode: 40200,
            city: "Tarnos",
            phone: 06,
            siret: "12345678901234",
            email: "anthonin64@lookup.com",
            password: "toto64",
          });
        res.should.have.status(201);
        res.should.be.a("object");
      } catch (error) {
        throw error;
      }
    });
  });
});
