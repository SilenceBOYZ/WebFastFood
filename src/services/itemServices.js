const { QueryTypes, STRING } = require('sequelize');
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

let readAllItems = (pageNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = {};
      let allItems = await seqeuelize.query("SELECT items.id, `foodName`, `foodPrice`, `foodDesc`, `foodImage`, `catergoryName` FROM items, catergories WHERE items.catergoryId = catergories.id", { type: QueryTypes.SELECT });
      const resultPerPage = 5;
      const numOfResult = allItems.length;
      const numberOfPages = Math.ceil(numOfResult / resultPerPage);
      // Tính ra tổng cộng số trang có trong một page (số link để click)
      if (pageNum < 1) {
        pageNum = 1
      }
      // Vị trí bắt đầu của phần tử trong một trang
      const startIndex = (pageNum - 1) * resultPerPage;
      let itemQuery = await seqeuelize.query(`SELECT items.id, items.foodName, items.foodPrice, items.foodDesc, items.foodImage, catergories.catergoryName FROM items, catergories WHERE items.catergoryId = catergories.id LIMIT ${startIndex}, ${resultPerPage}`, { type: QueryTypes.SELECT })
      const iteratorLink = (pageNum - 5) < 1 ? 1 : pageNum - 5;
      // Hiển thị ra những đường link có trong trang
      const endingLink = (iteratorLink + 9) <= numberOfPages ? (iteratorLink + 9) : pageNum + (numberOfPages - pageNum);
      console.log(endingLink);
      items = {
        pageNum,
        itemQuery,
        iteratorLink,
        endingLink,
        numberOfPages
      }
      resolve(items);
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

let readCatergoryNames = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let catergoryNames = await seqeuelize.query("SELECT catergories.catergoryName FROM items, catergories WHERE catergories.id = items.catergoryId", { type: QueryTypes.SELECT })
      resolve(catergoryNames);
    } catch (e) {
      reject(e);
    }
  })
}

let readAllCatergoriesForItems = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let catergory = await db.Catergories.findAll()
      resolve(catergory);
    } catch (e) {
      reject(e);
    }
  })
}

let readItemCatergoryNames = (itemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let catergoryNames = await seqeuelize.query(`SELECT catergories.catergoryName, catergories.id FROM items, catergories WHERE catergories.id = items.catergoryId AND items.id = ${itemId}`, { type: QueryTypes.SELECT })
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
  readCatergoryNames,
  readItemCatergoryNames,
  readAllCatergoriesForItems
}