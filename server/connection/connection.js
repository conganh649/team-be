const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// const URI =
//   "mongodb://dbUser:dbUser@cluster0-shard-00-00.olg2s.mongodb.net:27017,cluster0-shard-00-01.olg2s.mongodb.net:27017,cluster0-shard-00-02.olg2s.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-d1xn4h-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/demotraining", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
