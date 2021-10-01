const categoryService = require("../services/categoryService");

const createCategory = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not empty" });
      return;
    }
    const category = await categoryService.createCategory(req);
    res.status(200).json({
      success: true,
      message: "Create category successfully!",
      data: category,
    });
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(error.status).json({ success: false, message: error.message });
    }
  }
};
const getCategory = async (req, res) => {
  try {
    const categories = await categoryService.getCategory();
    res.status(200).send(categories);
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(error.status).json({ message: error.message });
    }
  }
  return categoryService.getCategory(req, res);
};
const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).send(category);
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(error.status).json({ message: error.message });
    }
  }
  return categoryService.getCategory(req, res);
};
const updateCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not empty" });
  }
  try {
    const result = await categoryService.updateCategory(req);
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({
      success: result,
      message: "Category updated successfully",
      data: category,
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
const deleteCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not empty" });
  }
  try {
    const result = await categoryService.deleteCategory(req);
    res
      .status(200)
      .json({ success: result, message: "Category deleted successfully" });
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
module.exports = {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
