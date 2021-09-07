var User = require("../models/userModel");

// CREATE AND SAVE NEW USER
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    // Check Email exist or not
    const { email } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck)
      return res.status(401).json({
        success: false,
        message:
          "The email address you have entered is already associated with another account.",
      });
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
    await user.save(user);
    res
      .status(200)
      .json({ success: true, message: "Create user successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ALL USERS / READ USER BY ID
exports.find = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    User.findById(id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "User not found" });
        } else {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Error finding user with id " + id });
      });
  } else {
    User.find()
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retriving data",
        });
      });
  }
};

// UPDATE USER BY ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send({ message: "Update successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error update user information" });
    });
};

// DELETE USER BY ID
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete user with id =" + id,
      });
    });
};
