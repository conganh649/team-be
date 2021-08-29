const express = require("express");
const connectDB = require("./connection/connection");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

console.log(process.env.DB_URL);
//Models
const { User } = require("./models/user");

//===============================
//          USERS
//===============================
app.post("/api/users/register", async (req, res) => {
  const { email, password, name, lastname } = req.body;
  let user = {};
  user.email = email;
  user.password = password;
  user.name = name;
  user.lastname = lastname;
  let userModel = new User(user);
  await userModel.save((err, doc) => {
    if (err) return res.json({ success: "Sai kia alo", err });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});

connectDB();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
