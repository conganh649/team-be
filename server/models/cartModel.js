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
          required: true
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      phoneNumber: { type: String },
      address: { type: String },
    },
    state: ["cart", "order"],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);


