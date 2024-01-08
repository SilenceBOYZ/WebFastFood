const { QueryTypes, STRING } = require('sequelize');
const { seqeuelize } = require("../../config");

let readAllItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allItems = await seqeuelize.query("SELECT * FROM Items", { type: QueryTypes.SELECT });
      console.log(allItems);
      resolve(allItems);
    } catch (e) {
      reject(e);
    }
  })
}


module.exports = {
  readAllItems
}