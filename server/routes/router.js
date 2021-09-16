const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const productController = require("../controller/productController");
const authController = require("../controller/authController");
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

module.exports = route;
