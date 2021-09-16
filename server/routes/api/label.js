const express = require("express");
const labelController = require("../../controller/labelController");
var router = express.Router();
router.post("/labels", async (req, res) => {
  if (Array.isArray(req.body)) {
    return labelController.createLabel(req, res);
  }
  return await labelController.createLabel(req, res);
});
router.get("/labels", (req, res) => labelController.getLabel(req, res));
router.get("/labels/:id", (req, res) => labelController.getLabelById(req, res));
router.put("/labels/:id", (req, res) => labelController.updateLabel(req, res));
router.delete("/labels/:id", (req, res) => labelController.deleteLabel(req, res));
module.exports = router;
