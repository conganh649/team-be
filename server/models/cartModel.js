const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cartItem: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
    },
    state: ["cart", "order"],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
