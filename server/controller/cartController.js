
const Cart = require("../models/cartModel");

exports.addToCart = (req, res) => {
  Cart.find().exec((err,cart) => {
    if(err) return res.status(400).json({err});
    if (cart) {
      //if cart exist
      const isItemAdded = cart.cartItem.find(
        (c) => c.product == req.body.cartItem.product
      );
      if (isItemAdded) {
        Cart.updateOne(
          { "cartItem.product": req.body.cartItem.product },
          {
            $set: {
              cartItem: {
                ...req.body.cartItem,
                qty: isItemAdded.qty + req.body.cartItem.qty,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      } else {
        Cart.updateOne({
          $push: {
            cartItem: req.body.cartItem,
          },
        }).exec((error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }
    } else {
      //if cart not exist
      const cart = new Cart({
        cartItem: [req.body.cartItem],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  })
  
};
exports.getCartItem = (req, res) => {
  Cart.find().populate("cartItem.product","_id name price productThumbnail").exec((err,cart) => {
    if(err) return res.status(400).json({ err });
    if (cart) {
      let cartItem = {};
      cart.cartItem.forEach((item, index) => {
        cartItem[item.product._id.toString()] = {
          _id: item.product._id.toString(),
          name: item.product.name,
          image: item.product.productThumbnail,
          price: item.product.price,
          qty: item.qty,
        };
      });
      res.status(200).json({ cartItem });
    }
  })
 
};
exports.removeCartItem = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.updateOne({
      $pull: {
        cartItem: {
          product: productId,
        },
      },
    }).exec((err, result) => {
      if (err) return res.status(400).json({ err });
      if (result) {
        res.status(200).json({ result });
      }
    });
  }
};
