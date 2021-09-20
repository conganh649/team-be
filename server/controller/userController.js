var userService = require("../services/userService");

// CREATE AND SAVE NEW USER
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    const user = await userService.createOne(req);
    res
      .status(200)
      .json({ success: true, message: "Create user successfully", data: user });
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

// READ ALL USERS / READ USER BY ID
exports.find = async (req, res) => {
  if (req.query.id) {
    //Get one by id
    try {
      const user = await userService.getOneById(req.query.id);
      res.status(200).send(user);
    } catch (error) {
      if (!error.status) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(error.status).json({ message: error.message });
      }
    }
  } else {
    //Get all
    try {
      const user = await userService.getAll();
      res.status(200).send(user);
    } catch (error) {
      if (!error.status) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(error.status).json({ message: error.message });
      }
    }
  }
};

// UPDATE USER BY ID
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  try {
    const result = await userService.updateById(req);
    const user = await userService.getOneById(req.params.id);
    res.status(200).json({
      success: result,
      message: "User updated successfully",
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

// DELETE USER BY ID
exports.delete = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  try {
    const result = await userService.deleteById(req);
    res
      .status(200)
      .json({ success: result, message: "User deleted successfully" });
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
