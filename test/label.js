let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../server/server");
let Label = require("../server/models/labelModel");

describe("Test api label", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });
  describe("#Create a label", () => {
    it("it creates a label", (done) => {
      let body = {
        labelName: "T-shirt",
        category: "613b2b51f9996ff5756ea6b8",
      };
      chai
        .request(server)
        .post("/api/labels")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("labelName").eql(body.labelName);
          res.body.should.have.property("category").eql(body.category);
          done();
        })
        .timeout(10000);
    });
  });
  describe("Get all labels", () => {
    it("it gets all labels", (done) => {
      chai
        .request(server)
        .get("/api/labels")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
        .timeout(10000);
    });
  });
  describe("Get label by id", () => {
    it("ot get label by id", (done) => {
      let test = new Label({
        labelName: "Shirt",
        category: "613b2b51f9996ff5756ea6b8",
      });
      test.save((err, body) => {
        chai
          .request(server)
          .get("/api/labels")
          .query({ id: test.id })
          .send(body)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
          .timeout(10000);
      });
    });
  });
  describe("Update label ", () => {
    it("it updates a label", (done) => {
      let test = new Label({
        labelName: "Shirt",
        category: "613b2b51f9996ff5756ea6b8",
      });
      test.save((err, label) => {
        chai
          .request(server)
          .put("/api/labels/" + label.id)
          .send({
            labelName: "skirt",
            category: "613b2b51f9996ff5756ea6b8",
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
          .timeout(10000);
      });
    });
  });
  describe("Delete a label", (done) => {
    it("it deletes a label", (done) => {
      let test = new Label({
        labelName: "Shirt",
        category: "613b2b51f9996ff5756ea6b8",
      });
      test.save((err, label) => {
        chai
          .request(server)
          .delete("/api/labels/" + label.id)
          .send(label)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          })
          .timeout(10000);
      });
    });
  });
});
