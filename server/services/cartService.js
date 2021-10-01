const Cart = require("../models/cartModel");
const createCart = async (cart) => {
  const newCart = new Cart(cart);
  return newCart.save();
};
const getCartItem = (query, res) => {
  Cart.find(query, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
};
const deleteCartItem = (req, res) => {
  Cart.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "CartItem successfully deleted",
    };
    res.status(200).send(response);
  });
};
const updateCartItem = async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    returnOriginal: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("Cart not found");
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
const getCartItemById = (query) => {
  return Cart.find(query);
};
module.exports = {
  createCart,
  getCartItem,
  deleteCartItem,
  updateCartItem,
  getCartItemById,
};
