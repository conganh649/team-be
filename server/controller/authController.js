var userService = require("../services/userService");

exports.signup = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    const user = await userService.createOne(req);
    res.status(200).json({
      success: true,
      message: "Create user successfully",
      data: user,
    });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};

exports.signin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const result = await userService.signin(userName, password);
    return res.status(200).json({
      success: true,
      message: "login successfully",
      data: result,
    });
  } catch (error) {
    if (!error.status) {
      if (error.message === "invalid_password") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      }
      if (error.message === "incorrect_username") {
        return res
          .status(400)
          .json({ success: false, message: "Username is not found" });
      }
      // return res.status(500).json("Internal server");
    } else {
      res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  }
};
