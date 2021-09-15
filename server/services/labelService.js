const Label = require("../models/labelModel");

const createLabel = (label) => {
  const newLabel = new Label(label);
  return newLabel.save();
};
const getLabel = (query, res) => {
  Label.find(query, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};
const getLabelById = (query) => {
  return Label.find(query);
};
const updateLabel = (req,res) => {
    const content = req.body;
    Label.findOneAndUpdate(req.params.id, content, {new: true}, function (err,doc){
        if(err) return res.status(500).send(err);
        return res.json(doc);
    })
}
const deleteLabel = (req, res) => {
    Label.findByIdAndDelete(req.params.id, (err) => {
        if(err) return res.status(500).send(err);
        const response = {
            message:"Label successfully deleted"
        };
        return res.status(200).send(response);
    })
}
module.exports = {
  createLabel,
  getLabel,
  getLabelById,
  updateLabel,
  deleteLabel
};
