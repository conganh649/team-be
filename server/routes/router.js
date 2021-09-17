const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
const labelController = require("../controller/labelController");
// API

// USERS
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

// PRODUCTS
route.get("/api/products", productController.getAll);
route.post("/api/product", productController.create);
route.get("/api/product/:id", productController.getOne);
route.put("/api/product/:id", productController.update);
route.delete("/api/products/:id", productController.delete);

//AUTH
route.post("/api/signup", authController.signup);
route.get("/api/activation/:token", authController.activateAccount);

// CARTS
route.post("/carts", async (req, res) => {
  if (Array.isArray(req.body.items)) {
    return cartController.createCart(req, res);
  }
  return await cartController.createCart(req, res);
});
route.get("/carts", (req, res) => cartController.getCartItem(req, res));
route.delete("/carts/:id", (req, res) => {
  return cartController.deleteCartItem(req, res);
});
route.put("/carts/:id", (req, res) => {
  return cartController.updateCartItem(req, res);
});
route.get("/carts/:id", (req, res) => {
  cartController.getCartItemById(req, res);
});

//LABELS
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
