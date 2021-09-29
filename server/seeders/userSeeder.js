"use-strict";
const excelToJson = require("convert-excel-to-json");
var User = require("../models/userModel");

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "users",
      header: { rows: 1 },
      columnToKey: {
        A: "userName",
        B: "fullName",
        C: "phoneNumber",
        D: "email",
        E: "password",
        F: "address",
        G: "dateofbirth",
        H: "role",
      },
    },
  ],
});

async function seedData(number) {
  await User.remove({});
  let i = 0;
  for (i = 0; i < number; i++) {
    const newUser = new User({
      userName: result.users[i].userName,
      fullName: result.users[i].fullName,
      phoneNumber: result.users[i].phoneNumber,
      email: result.users[i].email,
      password: result.users[i].password,
      address: result.users[i].address,
      dateofbirth: result.users[i].dateofbirth,
      role: result.users[i].role,
    });
    newUser.save(newUser);
    console.log(i + "-" + newUser.userName + " saved");
  }
}

module.exports = seedData;
