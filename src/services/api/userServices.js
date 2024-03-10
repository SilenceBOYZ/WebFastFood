const { where } = require("sequelize");
const db = require("../../models/index");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function checkUserPassword(passwordRef, userPassword) {
  const match = await bcrypt.compareSync(passwordRef, userPassword);
  return match;
}

let getAllUserData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Users.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let getAllUserEmail = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Users.findAll({
        attributes: ['email']
      })
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

let checkUserLogin = (userEmail, passwordRef) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let user = await db.Users.findOne({
        where: {
          email: userEmail
        }
      })
      if(!user) {
        data.errCode = 1;
        data.errMessage = "Email không tồn tại";
      } else {
        let check = await checkUserPassword(passwordRef, user.userPassword);
        if(check) {
          let userData = await db.Users.findOne({
            where: {
              email: userEmail
            },
            attributes:['id']
          })
          data.errCode = 0;
          data.errMessage = "Bạn đã đăng nhập thành công";
          data.user = jwt.sign(userData, process.env.SECRET);
          console.log(data);
        } else {
          data.errCode = 2;
          data.errMessage = "Mật khẩu không chính xác";
        }
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  getAllUserData,
  getAllUserEmail,
  checkUserLogin
}