let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server/server");
let should = chai.should();
let User = require("../server/models/userModel");
chai.use(chaiHttp);

describe("SignUp API", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
  /**
   * TEST SIGN UP API
   */
  describe("POST /api/signup", () => {
    it("it should not POST a user without without Email field", (done) => {
      let newUser = {
        userName: "UnitTest1",
        fullName: "UnitTest1",
        phoneNumber: "0932458888",
        password: "UnitTest1",
        address: "UnitTest1",
        dateofbirth: "06041999",
        role: "customer",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(500);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          done();
        });
    });

    it("it should POST a user", (done) => {
      let newUser = {
        userName: "UnitTest2",
        fullName: "UnitTest2",
        phoneNumber: "0932458888",
        email: "tranconganh641999@gmail.com",
        password: "UnitTest2",
        address: "UnitTest2",
        dateofbirth: "06041999",
        role: "customer",
      };
      chai
        .request(server)
        .post("/api/signup")
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eql("Create user successfully");
          response.body.should.have
            .property("verification")
            .eql("Queued. Thank you.");
          response.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
});
