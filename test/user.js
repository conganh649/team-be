let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server/server");
let should = chai.should();
let User = require("../server/models/userModel");
chai.use(chaiHttp);

describe("Users API", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
  /**
   * TEST READ ALL
   */
  describe("GET /api/users", () => {
    it("It should GET ALL the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * TEST POST
   */

  describe("POST /api/users", () => {
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
        userName: "UnitTest1",
        fullName: "UnitTest1",
        phoneNumber: "0932458888",
        email: "UnitTest1@gmail.com",
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
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eql("Create user successfully");
          response.body.should.have.property("success").eql(true);
          done();
        });
    });
  });

  /**
   * TEST READ ONE BY ID
   */
  describe("GET /api/users query by id", () => {
    it("it should GET A USER by the given id", (done) => {
      let testUser = new User({
        userName: "UnitTest2",
        fullName: "UnitTest2",
        phoneNumber: "0932458888",
        email: "UnitTest2@gmail.com",
        password: "UnitTest2",
        address: "UnitTest2",
        dateofbirth: "06041999",
        role: "customer",
      });
      testUser.save((err, book) => {
        chai
          .request(server)
          .get("/api/users")
          .query({
            id: testUser.id,
          })
          .send(book)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("userName");
            response.body.should.have.property("fullName");
            response.body.should.have.property("phoneNumber");
            response.body.should.have.property("email");
            response.body.should.have.property("password");
            response.body.should.have.property("address");
            response.body.should.have.property("dateofbirth");
            response.body.should.have.property("role");
            response.body.should.have.property("_id").eql(testUser.id);
            done();
          });
      });
    });
  });

  /**
   * TEST UPDATE USER
   */

  describe("PUT /api/users/:id", () => {
    it("it should UPDATE a user given by the id", (done) => {
      let updateUser = new User({
        userName: "UnitTestUpdate",
        fullName: "UnitTestUpdate",
        phoneNumber: "0932455555",
        email: "UnitTestUpdate@gmail.com",
        password: "UnitTestUpdate",
        address: "UnitTestUpdate",
        dateofbirth: "06042000",
        role: "admin",
      });
      updateUser.save((err, user) => {
        chai
          .request(server)
          .put("/api/users/" + user.id)
          .send({
            userName: "Update",
            fullName: "Update",
            phoneNumber: "0932455555",
            email: "Update@gmail.com",
            password: "Update",
            address: "Update",
            dateofbirth: "06042000",
            role: "customer",
          })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("success").eql(true);
            response.body.should.have
              .property("message")
              .eql("User updated successfully");
            done();
          });
      });
    });
  });
  /**
   * TEST DELETE USER
   */
  describe("DELETE /api/users/:id", () => {
    it("it should DELETE a user given by the id", (done) => {
      let deleteUser = new User({
        userName: "UnitTestDelete",
        fullName: "UnitTestDelete",
        phoneNumber: "0932455555",
        email: "UnitTestDelete@gmail.com",
        password: "UnitTestDelete",
        address: "UnitTestDelete",
        dateofbirth: "06042000",
        role: "customer",
      });
      deleteUser.save((err, user) => {
        chai
          .request(server)
          .delete("/api/users/" + user.id)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("success").eql(true);
            response.body.should.have
              .property("message")
              .eql("User deleted successfully");
            done();
          });
      });
    });
  });
});
