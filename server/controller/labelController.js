const labelService = require("../services/labelService");

const createLabel = async (req, res) => {
  let label = req.body;
  return await labelService.createLabel(label).then((newLabel, err) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).json(newLabel);
  });
};
const getLabel = (req, res) => {
  return labelService.getLabel(req, res);
};
const getLabelById = (req, res) => {
  let query = { _id: req.params.id };
  return labelService.getLabelById(query).then((data, err) => {
    if (err) return res.status(500).send(err);
    if (data == null)
      return res.status(404).json({ message: "Cannot find label" });
    return res.status(200).json(data);
  });
};
const updateLabel = (req, res) => {
  return labelService.updateLabel(req, res);
};
const deleteLabel = (req,res) => {
    return labelService.deleteLabel(req, res);
}
module.exports = {
  createLabel,
  getLabel,
  getLabelById,
  updateLabel,
  deleteLabel
};
