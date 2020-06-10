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

describe("get all carousel",() => {
    it("should return an array of carousel", async () => {
        try{
            const res = await chai.request(server).get("/carousel");
            res.body.should.be.a("array");
            res.body[0].should.have.keys(['id','title','description','link','picture','createdAt','updatedAt'])
        } catch(err){
            throw err;
        }
    })
})

