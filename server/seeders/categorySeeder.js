"use-strict";
const excelToJson = require("convert-excel-to-json");
const connectDB = require("../connection/connection");
var Category = require("../models/categoryModel");
const args = process.argv;
async function connect() {
  await connectDB();
}

const result = excelToJson({
  sourceFile:
    "D:/Working/Enclave/Technical_Training/team-project/be/server/seeders/data.xlsx",
  sheets: [
    {
      name: "categories",
      header: { rows: 1 },
      columnToKey: {
        A: "categoryName",
      },
    },
  ],
});

async function seedData() {
  await connect();
  await Category.remove({});
  let i = 0;
  for (i = 0; i < args[2]; i++) {
    const newCategory = new Category({
      categoryName: result.categories[i].categoryName,
    });
    newCategory.save(newCategory);
    console.log(i + "-" + newCategory.categoryName + " saved");
  }
}

seedData();
