const chai = require('chai');
const chaiHttp = require('chai-http');
const Carousel = require('../model/carousel.model')

let should =chai.should();

let server = require('../index');

const sequelize = require('../sequelize');

chai.use(chaiHttp);

describe("CAROUSSEL", () =>{
    before(async () =>{
        await sequelize.sync({force: true});
        
        await Carousel.create({
            titre: "test",
            description: "Loreum ipsum",
            link: "https://www.test.fr",
            picture: "https://www.test.fr/test.jpg"
        })
    })

    describe("get all carousel",() => {
        it("should return an array of carousel", async () => {
            try{
                const res = await chai.request(server).get("/carousels");
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body[0].should.have.keys(["id", "title", "description", "link", "picture","createdAt","updatedAt"]);
                res.body.length.should.be.eql(1)
            } catch(err){
                throw err;
            }
        })
    })

})


// describe("post a carousel",() => {
//     it("should post new carousel", async () => {
//         try{
//             const res = await chai.request(server).post("/carousel");
//             res.should.have.status(201);
//             res.body.should.be.a("object");
//             res.body.should.have.keys(["id", "title", "description", "link", "picture","createdAt","updatedAt"]);
//         } catch(err){
//             throw err;
//         }
//     })
// })
