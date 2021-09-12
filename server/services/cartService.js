const Cart = require("../models/cartModel");
const createCart = async (cart) => {
  const newCart = new Cart(cart);
  return newCart.save();
};
const getCartItem = (query, res) => {
  Cart.find(query, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json({ data: data });
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
const updateCartItem = (req, res) => {
  const content = req.body;
  Cart.findOneAndUpdate(
    req.params.id,
    content,
    { new: true },
    function (err, doc) {
      if (err) return res.status(500).send(err);
      return res.json(doc);
    }
  );
};
module.exports = {
  createCart,
  getCartItem,
  deleteCartItem,
  updateCartItem,
};
