const { QueryTypes } = require('sequelize');
const db = require("../models/index");
const { seqeuelize } = require("../config");

let createNewItem = (data, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Items.create({
        foodName: data.productName,
        foodPrice: data.productPrice,
        foodDesc: data.productDesc,
        foodImage: imageName,
        catergoryId: parseInt(data.productCatergory)
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  })
}

let readAllItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allItems = await db.Items.findAll({
        raw: true,
        order: [
          ['id', 'DESC'],
        ],
      });
      resolve(allItems);
    } catch (e) {
      reject(e);
    }
  })
}

let editAItem = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let aItem = await db.Items.findOne({
        where: {
          id: itemId
        }
      })
      console.log(aItem);
      resolve(aItem);
    } catch (e) {
      reject(e);
    }
  })
}

let updateItem = (itemId, data, newimage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = {};
      let aItem = await db.Items.findOne({
        where: {
          id: itemId
        }
      })
      if (aItem) {
        await db.Items.update({
          foodName: data.productName,
          foodPrice: data.productPrice,
          foodDesc: data.productDesc,
          foodImage: newimage,
          catergoryId: data.productCatergory,
        }, {
          where: {
            id: itemId
          }
        });
        item.errCode = 0;
        item.errMessage = "Update Item have been Succeed";
      } else {
        item.errCode = 1;
        item.errMessage = "Data haven't existed in our database";
      }
      resolve(item);
    } catch (e) {
      reject(e);
    }
  })
}

let removeItem = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let message = {};
      let aItem = await db.Items.findOne({
        where: {
          id: itemId
        }
      })
      if (aItem) {
        await db.Items.destroy({
          where: {
            id: itemId
          }
        });
        message.errCode = 0
        message.errMessage = "Item have been remove from your system";
      } else {
        message.errCode = 1
        message.errMessage = "Data haven't existed in our database";
      }
      resolve(message);
    } catch (e) {
      reject(e);
    }
  })
}

let readCatergoryNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let catergoryNames = await seqeuelize.query("SELECT catergories.catergoryName FROM items, catergories WHERE catergories.id = items.catergoryId", { type: QueryTypes.SELECT })
      resolve(catergoryNames);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  createNewItem,
  readAllItems,
  editAItem,
  updateItem,
  removeItem,
  readCatergoryNames
}