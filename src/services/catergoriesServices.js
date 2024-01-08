const { seqeuelize } = require("../config");
const db = require("../models/index");
const { QueryTypes } = require('sequelize');


let readAllCatergories = (pageNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCatergories = {};
      let Catergories = await seqeuelize.query("SELECT * FROM Catergories", { type: QueryTypes.SELECT })
      const resultPerPage = 5;
      const numOfResult = Catergories.length;
      const numberOfPages = Math.ceil(numOfResult / resultPerPage);
      if (pageNum < 1 || pageNum == undefined) {
        pageNum = 1
      }
      const startIndex = (pageNum - 1) * resultPerPage;
      let catergoryQuery = await seqeuelize.query(`SELECT * FROM Catergories LIMIT ${startIndex}, ${resultPerPage}`, { type: QueryTypes.SELECT })
      const iteratorLink = (pageNum - 5) < 1 ? 1 : pageNum - 5;
      // Hiển thị ra những đường link có trong trang
      const endingLink = (iteratorLink + 9) <= numberOfPages ? (iteratorLink + 9) : pageNum + (numberOfPages - pageNum);
      console.log(endingLink);
      allCatergories = {
        pageNum,
        catergoryQuery,
        iteratorLink,
        endingLink,
        numberOfPages
      }
      resolve(allCatergories);
    } catch (e) {
      reject(e);
    }
  })
}

// findAll({
//   raw: true,
//   order: [
//     ['id', 'DESC'],
//   ],
// });

let createCatergory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newCatergory = await db.Catergories.create({
        catergoryName: data.catergoryName,
        catergoryDesc: data.catergoryDesc
      });
      resolve(newCatergory);
    } catch (e) {
      reject(e);
    }
  })
}

let getCatergoryData = (idFound) => {
  return new Promise(async (resolve, reject) => {
    try {
      let message = {}
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      if (aItem) {
        message.errCode = 0;
        message.errMessage = "Get a data in our system ";
      } else {
        message.errCode = 1;
        message.errMessage = "The data doesn't exist in our system ";
      }
      resolve(aItem);
    } catch (e) {
      reject(e);
    }
  })
}

let updateCatergoryData = (idFound, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let message = {}
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      console.log(aItem);
      console.log(data);
      if (aItem) {
        let catergoryItem = await db.Catergories.update({
          catergoryName: data.catergoryName,
          catergoryDesc: data.catergoryDesc,
        }, {
          where: {
            id: idFound
          }
        }
        )
        resolve(catergoryItem);
      } else {
        message.errCode = 1;
        message.errMessage = "The data doesn't exist in our system ";
      }
      resolve(message);
    } catch (e) {
      reject(e);
    }
  })
}

let deleteCatergoryData = async (idFound) => {
  return new Promise(async (resolve, reject) => {
    try {
      let message = {};
      let aItem = await db.Catergories.findOne({
        where: {
          id: idFound
        }
      })
      if (aItem) {
        await db.Catergories.destroy({
          where: {
            id: idFound
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


module.exports = { readAllCatergories, createCatergory, getCatergoryData, updateCatergoryData, deleteCatergoryData }