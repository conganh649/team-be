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
route.post("/labels", async (req, res) => {
  if (Array.isArray(req.body)) {
    return labelController.createLabel(req, res);
  }
  return await labelController.createLabel(req, res);
});
route.get("/labels", (req, res) => labelController.getLabel(req, res));
route.get("/labels/:id", (req, res) => labelController.getLabelById(req, res));
route.put("/labels/:id", (req, res) => labelController.updateLabel(req, res));
route.delete("/labels/:id", (req, res) =>
  labelController.deleteLabel(req, res)
);
module.exports = route;
