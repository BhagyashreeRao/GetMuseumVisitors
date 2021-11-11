let assert = require('chai')
let chaiHttp = require('chai-http');
let server = require('../app')

chai.should();
chai.use(chaiHttp)

describe('Visitor API', () => {
    describe('GET /api/visitors',() =>  {
        it('should return all visitor details for specified and ignore the ones pass as ignore',(done) => {
            chai.request(server)
                .get('/api/visitors')
                .end((err,res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                })
                done();
        })
    })
})
