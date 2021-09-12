const cartService = require("../services/cartService");
const createCart = async (req, res) => {
  let cart = req.body;
  return await cartService.createCart(cart).then((newCart, err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(newCart);
  });
};
const getCartItem = (req, res) => {
  return cartService.getCartItem(req, res);
};
const deleteCartItem = (req, res) => {
  return cartService.deleteCartItem(req, res);
};
const updateCartItem = (req, res) => {
  return cartService.updateCartItem(req, res);
};
module.exports = {
  createCart,
  getCartItem,
  deleteCartItem,
  updateCartItem,
};
