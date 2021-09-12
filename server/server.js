var express = require("express");
const connectDB = require("./connection/connection");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
//routes
const cartRoutes = require("./routes/api/cart");

var app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
console.log("Enable CORS");
//Models
const { User } = require("./models/userModel");

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
    if (err) return res.json({ success: "Wrong post", err });
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

// cart route
app.use("/api", cartRoutes);
