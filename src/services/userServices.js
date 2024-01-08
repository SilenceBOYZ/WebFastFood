const { QueryTypes } = require('sequelize');
const { seqeuelize } = require("../config");
const db = require("../models/index");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let hashUserPassword = (userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(userPassword, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e)
    }
  })
}

let createUser = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let messageAlert = {}
      let checkEmail = await db.Users.findOne({
        where: {
          email: data.userEmail
        }
      });
      if(checkEmail) {
        messageAlert.errCode = 1
        messageAlert.errMessage = "The email have been already existed !!!"
      } else {
        let UserPassword = await hashUserPassword(data.userPassword);
        let user = await db.Users.create({
          userName: data.userName,
          userPassword: UserPassword,
          email: data.userEmail,
          roleId: data.userRole,
          userImage: image
        });
        messageAlert.errCode = 0
        messageAlert.errMessage = "A new user have been created !!!"
      }
      resolve(messageAlert);
    } catch (e) {
      reject(e);
    }
  })
}

let readAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await seqeuelize.query("SELECT users.id, users.userName, users.userPassword, users.email, users.userImage, roles.roleName, users.createdAt FROM users, roles WHERE users.roleId = roles.id", { type: QueryTypes.SELECT })
      resolve(users);
    } catch (e) {
      reject(e);
    }
  })
}

let getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await seqeuelize.query(`SELECT users.id, users.userName, users.userPassword, users.email, users.userImage, roles.roleName, users.roleId FROM users, roles WHERE users.roleId = roles.id AND users.id=${userId}`,
      { type: QueryTypes.SELECT })
      resolve(user);
    } catch (e) {
      reject(e)
    }
  })
}

let editUser = (userId, data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUserId = await db.Users.findOne({
        where: {
          id: userId
        }
      })
      if(checkUserId) {
        let UserPassword = await hashUserPassword(data.userPassword);
        let user = await db.Users.update({
          userName: data.userName,
          userPassword: UserPassword,
          email: data.userEmail,
          userImage: image,
          roleId: data.userRole
        }, {
          where: {
            id: userId
          }
        })
        resolve(user);
      } else {
        resolve("Can't find a user data");
      }
    } catch (e) {
      reject(e)
    }
  })
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let message = {};
      let User = await db.Users.findOne({
        where: {
          id: userId
        }
      })
      if (User) {
        await db.Users.destroy({
          where: {
            id: userId
          }
        });
        message.errCode = 0
        message.errMessage = "User have been remove from your system";
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
module.exports = {
  createUser,
  readAllUsers,
  getUser,
  editUser,
  deleteUser, 
}