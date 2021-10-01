"use-strict";
const excelToJson = require("convert-excel-to-json");
const connectDB = require("../connection/connection");
const async = require("async");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var Cart = require("../models/cartModel");
var Product = require("../models/productModel");
var User = require("../models/userModel");

async function connect() {
  await connectDB();
}

let referenceData = null;

new Promise((resolve) => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: require("bluebird"),
  });
  async.parallel(
    [
      (callback) => {
        User.find({}).exec((err, user_ids) => {
          callback(null, user_ids);
        });
      },
      (callback) => {
        Product.find({}).exec((err, product_ids) => {
          callback(null, product_ids);
        });
      },
    ],
    (err, results) => {
      resolve(results);
      mongoose.connection.close();
    }
  );
}).then((results) => {
  console.log(_.sample(results[1]));
  referenceData = results;
  seedData();
});

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "cartTest",
      header: { rows: 1 },
      columnToKey: {
        A: "qty",
        B: "price",
        C: "status",
        D: "fullName",
        E: "phoneNumber",
        F: "address",
        G: "user",
        H: "product",
      },
    },
  ],
});

async function seedData() {
  await connect();
  await Cart.remove({});
  let i = 0;
  let j = 0;
  for (i = 0; i < result.cartTest.length; i++) {
    let rand = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    let carts = [];

    for (j = 0; j < rand; j++) {
      carts.push({
        qty: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        product: _.sample(referenceData[1])._id.toString(),
        price: _.sample(referenceData[1]).price.toString(),
      });
    }

    const newCart = new Cart({
      cartItem: carts,
      status: result.cartTest[i].status,
      shippingAddress: {
        fullName: result.cartTest[i].fullName,
        phoneNumber: result.cartTest[i].phoneNumber,
        address: result.cartTest[i].address,
      },
      user: _.sample(referenceData[0])._id.toString(),
    });
    newCart.save(newCart);
    console.log(i + "-" + newCart.user + " saved");
  }
}
