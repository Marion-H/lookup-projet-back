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
      await sequelize.sync({force : true });
  
  
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

})