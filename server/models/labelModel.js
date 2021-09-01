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

const Label = mongoose.model("Label", labelSchema);

module.exports = { Label };
