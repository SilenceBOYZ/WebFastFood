const db = require("../models/index");
let readAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allRoles = await db.Roles.findAll({
        raw: true,
      });
      resolve(allRoles);
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  readAllRoles
}