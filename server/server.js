var express = require("express");
const connectDB = require("./connection/connection");
const bodyParser = require("body-parser");
var cors = require("cors");

var users = require("./routes/router");
const cartRoutes = require("./routes/router");
const labelRoutes = require("./routes/router");

const dotenv = require("dotenv");
dotenv.config();

var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
console.log("Enable CORS");

app.use("/", users);
connectDB();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

app.use("/api", cartRoutes);
app.use("/api", labelRoutes);

module.exports = app;
