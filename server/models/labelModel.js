const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    labelName: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Label", labelSchema);
