const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const cartController = require("../controller/cartController");
const labelController = require("../controller/labelController");
const categoryControler = require("../controller/categoryController");
// API

// USERS
route.post("/api/users", userController.create);
route.get("/api/users", userController.find);
route.put("/api/users/:id", userController.update);
route.delete("/api/users/:id", userController.delete);

// PRODUCTS
route.get("/api/products", productController.getAll);
route.post("/api/products", productController.create);
route.get("/api/products/:id", productController.getOne);
route.put("/api/products/:id", productController.update);
route.delete("/api/products/:id", productController.delete);

//AUTH
route.post("/api/signup", authController.signup);
route.post("/api/signin", authController.signin);
// CARTS
route.post("/api/carts", cartController.createCart);
route.get("/api/carts", cartController.getCartItem);
route.delete("/api/carts/:id", cartController.deleteCartItem);
route.put("/api/carts/:id", cartController.updateCartItem);
route.get("/api/carts/:id", cartController.getCartItemById);

//LABELS
route.post("/api/labels", labelController.createLabel);
route.get("/api/labels", labelController.getLabel);
route.get("/api/labels/:id", labelController.getLabelById);
route.put("/api/labels/:id", labelController.updateLabel);
route.delete("/api/labels/:id", labelController.deleteLabel);

//CATEGORIES
route.post("/api/categories", categoryControler.createCategory);
route.get("/api/categories", categoryControler.getCategory);
route.get("/api/categories/:id", categoryControler.getCategoryById);
route.put("/api/categories/:id", categoryControler.updateCategory);
route.delete("/api/categories/:id", categoryControler.deleteCategory);
module.exports = route;
