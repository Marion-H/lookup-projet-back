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

describe("CAROUSSEL", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    await Carousel.create({
    //   uuid: "52da6422-1c9c-46e1-9685-ec7ca433d834",
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
          .get(`/carousels/${Carousel.uuid}`);
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
    // it("should fail to create", async () => {
    //     try{
    //         const res = await chai
    //         .request(server)
    //         .post("/carousels")
    //         .send({
    //             title: "test"
    //         })
    //         res.body.should.have.status(422)
    //         res.body.should.be.a("object");
    //         res.body.should.have.keys(["status","message"]);
    //     } catch(err){
    //         throw err;
    //     }
    // })
  });

  describe("put a carousel", () => {
    it("should put a carousel", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/carousels/${Carousel.uuid}`);

        res.should.have.status(204);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
