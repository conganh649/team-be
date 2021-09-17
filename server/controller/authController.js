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
