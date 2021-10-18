"use-strict";
const excelToJson = require("convert-excel-to-json");
const connectDB = require("../connection/connection");
const async = require("async");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var Product = require("../models/productModel");
var Category = require("../models/categoryModel");
var Label = require("../models/labelModel");

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
        Category.find({}).exec((err, category_ids) => {
          callback(null, category_ids);
        });
      },
      (callback) => {
        Label.find({}).exec((err, label_ids) => {
          callback(null, label_ids);
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
      name: "productTest",
      header: { rows: 1 },
      columnToKey: {
        A: "productName",
        B: "productThumbnail",
        C: "description",
        D: "price",
        E: "discount",
        F: "status",
        G: "quantity",
        H: "provider",
        I: "numOfBuying",
      },
    },
  ],
});

async function seedData() {
  await connect();
  await Product.remove({});

  let i = 0;

  for (i = 0; i < result.productTest.length; i++) {
    let rand = Math.floor(Math.random() * 5);
    let labels = referenceData[1]
      .sort(() => 0.5 - Math.random())
      .slice(0, rand);

    const newProduct = new Product({
      productName: result.productTest[i].productName,
      productThumbnail: result.productTest[i].productThumbnail,
      description: result.productTest[i].description,
      price: result.productTest[i].price,
      discount: result.productTest[i].discount,
      status: result.productTest[i].status,
      quantity: result.productTest[i].quantity,
      provider: result.productTest[i].provider,
      category: _.sample(referenceData[0])._id.toString(),
      label: labels,
      numOfBuying: result.productTest[i].numOfBuying,
    });
    newProduct.save(newProduct);
    console.log(i + "-" + newProduct.productName + " saved");
  }
}
