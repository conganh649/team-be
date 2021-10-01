"use-strict";
const excelToJson = require("convert-excel-to-json");
var Label = require("../models/labelModel");

const result = excelToJson({
  sourceFile:
    "D:/Working/Enclave/Technical_Training/team-project/be/server/seeders/data.xlsx",
  sheets: [
    {
      name: "labels",
      header: { rows: 1 },
      columnToKey: {
        A: "labelName",
      },
    },
  ],
});

async function seedData() {
  await Label.remove({});
  let i = 0;
  for (i = 0; i < result.labels.length; i++) {
    const newLabel = new Label({
      labelName: result.labels[i].labelName,
    });
    newLabel.save(newLabel);
    console.log(i + "-" + newLabel.labelName + " saved");
  }
}

module.exports = seedData;
