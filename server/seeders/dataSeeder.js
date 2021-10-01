const userSeeder = require("./userSeeder");
const categorySeeder = require("./categorySeeder");
const labelSeeder = require("./labelSeeder");
const connectDB = require("../connection/connection");

async function connect() {
  await connectDB();
}

async function dataSeed() {
  await connect();
  console.log("=== USER SEED HERE ===");
  await userSeeder(50);
  console.log("=== CATEGORY SEED HERE ===");
  await categorySeeder();
  console.log("=== LABEL SEED HERE ===");
  await labelSeeder();
}

dataSeed();
