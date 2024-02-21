const authenticalSevervices = require("../../../services/authentical/authenticalServices");
const userApiService = require("../../../services/api/userServices")
const items = require("../../../services/indexPage/itemQuery");


let registUserAuth = async (req, res) => {
  let data = req.body;
  let alertMessage = await authenticalSevervices.registUserToSystem(data);
  res.render("pages/alert/alertRegist.ejs", { message: alertMessage.errMessage });
}
let LoginAuth = async (req, res) => {
  let email = await req.body.accountName;
  let password = await req.body.password;
  let data = await userApiService.checkUserLogin(email, password);
  switch (data.errCode) {
    case 1:
      res.render("pages/alert/alert.ejs", { message: data.errMessage });
      break;
    case 2:
      res.render("pages/alert/alert.ejs", { message: data.errMessage });
      break;
    default:
      // Tạo một cookies
      req.session.userId = data.user;
      // res.cookie("user", data.user, {
      //   // Set secure để không hiển thị cookie bên ngoài trình duyệt
      //   secure: true,
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 8 * 3600000)
      // });
      res.redirect(`../../user-page/private`);
      break;
  }
}
module.exports = {
  registUserAuth,
  LoginAuth,
}