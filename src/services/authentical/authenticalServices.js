const db = require("../../models/index");

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

let registUserToSystem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let messageAlert = {}
      let checkEmail = await db.Users.findOne({
        where: {
          email: data.emailNameRegister
        }
      });
      if(checkEmail) {
        messageAlert.errCode = 1
        messageAlert.errMessage = "Người dùng đã tồn tại trong hệ thống"
      } else if(data.passwordRegister != data.passwordConfirmRegister) {
        messageAlert.errCode = 2
        messageAlert.errMessage = "Mật khẩu xác nhận không khớp"
      } else {
        let UserPassword = await hashUserPassword(data.passwordConfirmRegister);
        await db.Users.create({
          userName: data.accountNameRegister,
          userPassword: UserPassword,
          email: data.emailNameRegister,
          roleId: 2,
          userImage: "CustomerImage.png",
          address: "",
          phoneNumber: "",
        });
        messageAlert.errCode = 0
        messageAlert.errMessage = "Bạn đã tạo user thành công"
      }
      resolve(messageAlert);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  registUserToSystem
}