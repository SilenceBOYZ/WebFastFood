const { QueryTypes, STRING } = require('sequelize');
const { seqeuelize } = require("../../config");

let readAllItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allItems = await seqeuelize.query("SELECT * FROM Items", { type: QueryTypes.SELECT });
      resolve(allItems);
    } catch (e) {
      reject(e);
    }
  })
}

let getSingleItem = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Item = await seqeuelize.query("SELECT items.id, `foodName`, `foodPrice`, `foodDesc`, `foodImage`, `catergoryName` FROM items, catergories WHERE items.catergoryId = catergories.id AND items.id="+itemId, { type: QueryTypes.SELECT });
      resolve(Item);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  readAllItems,
  getSingleItem
}