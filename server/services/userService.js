var User = require("../models/userModel");

exports.createOne = async function (req) {
  const { email } = req.body;
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    throw {
      status: 409,
      message:
        "The email address you have entered is already associated with another account",
    };
  }
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

  return await user.save(user);
};

exports.getAll = async function () {
  let users = null;
  await User.find()
    .then((result) => {
      users = result;
    })
    .catch((err) => {
      throw {
        status: err.status || 500,
        message: err.message || "Error occured while retriving data",
      };
    });
  return users;
};

exports.getOneById = async function (req) {
  const id = req.query.id;
  let user = null;
  await User.findById(id)
    .then((data) => {
      if (!data) {
        throw {
          status: 404,
          success: false,
          message: " User not found",
        };
      } else {
        user = data;
      }
    })
    .catch((err) => {
      throw {
        status: err.status || 500,
        success: false,
        message: err.message,
      };
    });
  return user;
};

exports.updateById = async function (req) {
  let success = false;

  const id = req.params.id;
  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        throw {
          status: 404,
          success: false,
          message: "User not found",
        };
      } else {
        success = true;
      }
    })
    .catch((err) => {
      throw {
        status: err.status || 500,
        success: false,
        message: err.message,
      };
    });
  return success;
};

exports.deleteById = async function (req) {
  let success = false;

  const id = req.params.id;
  await User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        throw {
          status: 404,
          message: "User not found. Maybe id is wrong!",
        };
      } else {
        success = true;
      }
    })
    .catch((err) => {
      throw {
        status: err.status || 500,
        success: false,
        message: err.message,
      };
    });
  return success;
};
