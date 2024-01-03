const db = require("../models/index");

let readAllCatergories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allCatergories = await db.Catergories.findAll({
        raw: true,
        order: [
          ['id', 'DESC'],
        ],
      });
      resolve(allCatergories);
    } catch (e) {
      reject(e);
    }
  })
}



module.exports = { readAllCatergories }