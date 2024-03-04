const { QueryTypes, STRING } = require('sequelize');
const { seqeuelize } = require("../../config");

let readAllItems = (limitItem) => {
  if (!limitItem) {
    limitItem = "";
  } else {
    limitItem = `ORDER BY RAND() LIMIT ${Number.parseInt(limitItem)};`
  }
  return new Promise(async (resolve, reject) => {
    try {
      let allItems = await seqeuelize.query("SELECT * FROM Items " + limitItem, { type: QueryTypes.SELECT });
      resolve(allItems);
    } catch (e) {
      reject(e);
    }
  })
}

let getSingleItem = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Item = await seqeuelize.query("SELECT items.id, `foodName`, `foodPrice`, `foodDesc`, `foodImage`, `catergoryName` FROM items, catergories WHERE items.catergoryId = catergories.id AND items.id=" + itemId, { type: QueryTypes.SELECT });
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