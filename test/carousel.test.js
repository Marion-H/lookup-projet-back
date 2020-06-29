const chai = require("chai");
const chaiHttp = require("chai-http");
const Carousel = require("../model/carousel.model");

let should = chai.should();

let server = require("../index");

const sequelize = require("../sequelize");

chai.use(chaiHttp);

const carouselKey = [
  "uuid",
  "title",
  "description",
  "link",
  "picture",
  "createdAt",
  "updatedAt",
];

let carousel;

describe("CAROUSSEL", () => {
  before(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    await sequelize.sync({ force: true });

    carousel = await Carousel.create({
      title: "test",
      description: "Loreum ipsum",
      link: "https://www.test.fr",
      picture: "https://www.test.fr/test.jpg",
    });
  });

  describe("get all carousel", () => {
    it("should return an array of carousel", async () => {
      try {
        const res = await chai.request(server).get("/carousels");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.keys(carouselKey);
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });

  describe("get a carousel", () => {
    it("should return an unique carousel", async () => {
      try {
        const res = await chai
          .request(server)
          .get(`/carousels/${carousel.uuid}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("post a carousel", () => {
    it("should post new carousel", async () => {
      try {
        const res = await chai.request(server).post("/carousels").send({
          title: "test",
          description: "Loreum ipsum",
          link: "https://www.test.fr",
          picture: "https://www.test.fr/test.jpg",
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys(carouselKey);
      } catch (err) {
        throw err;
      }
    });
    it("should fail to create", async () => {
      try {
        const res = await chai.request(server).post("/carousels").send({
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

  describe("put a carousel", () => {
    it("should put a carousel", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/carousels/${carousel.uuid}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });

  describe("delete a carousel", () => {
    it("should delete a single carousel", async () => {
      try {
        const res = await chai
          .request(server)
          .delete(`/carousels/${carousel.uuid}`);
        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
