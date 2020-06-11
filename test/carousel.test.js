const chai = require('chai');
const chaiHttp = require('chai-http');

let should =chai.should();

let server = require('../index');

const sequelize = require('../sequelize');

chai.use(chaiHttp);

// describe("CAROUSSEL", () =>{
//     before(async () =>{
//         await sequelize.sync({force: true});
        
//         await caroussel.create({
//             titre: "test",
//             descriptif: "Loreum ipsum",
//             lien: "http://www.test.fr",
//             image: "test"
//         })
//     })
// })

// describe("get all carousel",() => {
//     it("should return an array of carousel", async () => {
//         try{
//             const res = await chai.request(server).get("/carousel");
//             res.body.should.be.a("object");
//             res.body.should.have.keys(["id", "title", "description", "link", "picture"]);
//         } catch(err){
//             throw err;
//         }
//     })
// })

describe("post a carousel",() => {
    it("should post new carousel", async () => {
        try{
            const res = await chai.request(server).post("/carousel");
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.keys(["id", "title", "description", "link", "picture","createdAt","updatedAt"]);
        } catch(err){
            throw err;
        }
    })
})
