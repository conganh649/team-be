const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const labelController = require("../controller/labelController");
// API
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

// LABELS
route.post("/api/labels", labelController.createLabel);
route.get("/api/labels", labelController.getLabel);
route.get("/api/labels/:id",labelController.getLabelById);
route.put("/api/labels/:id", labelController.updateLabel);
route.delete("/api/labels/:id", labelController.deleteLabel);
module.exports = route;
