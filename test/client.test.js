// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const Client = require("../model/client.model");

// let should = chai.should();

// let server = require("../index");

// const sequelize = require("../sequelize");

// chai.use(chaiHttp);

// const clientKey = [
//   "uuid",
//   "companyName",
//   "streetNumber",
//   "streetName",
//   "city",
//   "postalCode",
//   "email",
//   "phone",
//   "siret",
//   "createdAt",
//   "updatedAt",
// ];

// let client;

// describe("Client", () => {
//   before(async () => {
//     await sequelize.sync({ force: true });

//     client = await Client.create({
//       companyName: "test",
//       streetNumber: 12,
//       streetName: "rue des sabots sans chevaux",
//       city: "Tarnus",
//       postalCode: 40200,
//       email: "test@gmail.cum",
//       phone: 9898796,
//       siret: "75254769187897",
//     });
//   });

//   describe("get all client", () => {
//     it("should return an array of client", async () => {
//       try {
//         const res = await chai.request(server).get("/clients");
//         res.should.have.status(200);
//         res.body.should.be.a("array");
//         res.body[0].should.have.keys(clientKey);
//         res.body.length.should.be.eql(1);
//       } catch (err) {
//         throw err;
//       }
//     });
//   });

//   describe("get a client", () => {
//     it("should return an unique client", async () => {
//       try {
//         const res = await chai.request(server).get(`/clients/${client.uuid}`);
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//       } catch (err) {
//         throw err;
//       }
//     });
//   });

//   describe("post a client", () => {
//     it("should post new client", async () => {
//       try {
//         const res = await chai.request(server).post("/clients").send({
//           companyName: "test",
//           streetNumber: 12,
//           streetName: "rue des sabots sans chevaux",
//           city: "Tarnus",
//           postalCode: 40200,
//           email: "test@gmail.cum",
//           phone: 9898796969,
//           siret: "75254769187897",
//         });
//         res.should.have.status(201);
//         res.body.should.be.a("object");
//         res.body.should.have.keys(clientKey);
//       } catch (err) {
//         throw err;
//       }
//     });
//     it("should fail to create", async () => {
//       try {
//         const res = await chai.request(server).post("/clients").send({
//           companyName: "test",
//         });
//         console.log(res.body);
//         res.should.have.status(422);
//         res.body.should.be.a("object");
//         res.body.should.have.keys(["status", "message"]);
//       } catch (err) {
//         throw err;
//       }
//     });
//   });

//   //   describe("put a carousel", () => {
//   //     it("should put a carousel", async () => {
//   //       try {
//   //         const res = await chai
//   //           .request(server)
//   //           .put(`/carousels/${carousel.uuid}`);
//   //         res.should.have.status(204);
//   //         res.body.should.be.a("object");
//   //       } catch (err) {
//   //         throw err;
//   //       }
//   //     });
//   //   });

//   //   describe("delete a carousel", () => {
//   //     it("should delete a single carousel", async () => {
//   //       try {
//   //         const res = await chai
//   //           .request(server)
//   //           .delete(`/carousels/${carousel.uuid}`);
//   //         res.should.have.status(204);
//   //         res.body.should.be.a("object");
//   //       } catch (err) {
//   //         throw err;
//   //       }
//   //     });
//   //   });
// });
