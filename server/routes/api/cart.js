const express = require("express");
const router = express.Router();

const cartController = require("../../controller/cartController");
router.post("/carts", async (req, res) => {
  if (Array.isArray(req.body.items)) {
    return cartController.createCart(req, res);
  }
  return await cartController.createCart(req, res);
});
router.get("/carts", (req, res) => cartController.getCartItem(req, res));
router.delete("/carts/:id", (req, res) => {
  return cartController.deleteCartItem(req, res);
});
router.put("/carts/:id", (req, res) => {
  return cartController.updateCartItem(req, res);
});
router.get("/carts/:id", (req, res) => {cartController.getCartItemById(req,res)})
module.exports = router;
