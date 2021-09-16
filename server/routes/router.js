const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");
// API

// USERS
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

//AUTH
route.post("/api/signup", authController.signup);
route.get("/api/activation/:token", authController.activateAccount);

module.exports = route;
