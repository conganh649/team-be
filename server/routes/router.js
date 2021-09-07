const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");

// API
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

module.exports = route;
