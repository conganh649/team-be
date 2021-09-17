const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_I = 10;

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    fullName: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    dateofbirth: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
