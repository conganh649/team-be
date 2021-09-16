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
const getCartItemById = (req, res) => {
  let query = { _id: req.params.id };
  return cartService.getCartItemById(query).then((data, err) => {
    if (err) return res.status(500).send(err);
    if (data == null)
      return res.status(404).json({ message: "Cannot find cartItem" });
    return res.status(200).json(data);
  });
};
module.exports = {
  createCart,
  getCartItem,
  deleteCartItem,
  updateCartItem,
  getCartItemById,
};
