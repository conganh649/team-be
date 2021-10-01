const mongoose = require("mongoose");

const productShema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productThumbnail: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    status: { type: String, required: true },
    quantity: { type: Number, required: true },
    provider: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productShema);
