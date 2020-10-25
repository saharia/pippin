// Import the dependencies for testing
const chai  =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Books", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all books record", (done) => {
             chai.request(app)
                 .get('/api/books')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
      });

    describe("POST /", () => {
      it("should create new record", (done) => {
        chai.request(app)
            .post('/api/books/create')
            .send({ book: 'test' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
              });
      });
    });

    describe("PATCH /", () => {
      it("should update book", (done) => {
        chai.request(app)
            .patch('/api/books/update')
            .send({ original_book: 'test', new_book: 'test12' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
             });
      });
    });

    describe("PUT /", () => {
      it("should save record into db", (done) => {
        chai.request(app)
            .put('/api/books/save')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             });
      });
    });
});