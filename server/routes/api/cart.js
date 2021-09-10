const express = require("express");
const router = express.Router();

const cartController = require("../../controller/cartController");
//create a cart
// router.post('/', (req, res) => {
//     // if(Array.isArray(req.body)) {
//     //     return cartController.createCart(req,res)
//     // }
//     //res.send("Create a cart");
//     return cartController.createCart(req,res)
// })
router.post("/cart/add", cartController.addToCart);
router.get("/cart/get", cartController.getCartItem);
router.push("/cart/delete",cartController.removeCartItem)
module.exports = router;
