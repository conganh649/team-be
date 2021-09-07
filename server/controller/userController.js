var User = require("../models/userModel");

// CREATE AND SAVE NEW USER
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // New user
  const user = new User({
    userName: req.body.userName,
    fullName: req.body.fullName,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    dateofbirth: req.body.dateofbirth,
    role: req.body.role,
  });

  // Save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// READ ALL USERS / READ USER BY ID
exports.find = (req, res) => {};

// UPDATE USER BY ID
exports.update = (req, res) => {};

// DELETE USER BY ID
exports.delete = (req, res) => {};
