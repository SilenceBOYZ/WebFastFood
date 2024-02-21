const items = require("../../../services/indexPage/itemQuery");
const userService = require("../../../services/userServices");
const itemService = require("../../../services/indexPage/itemQuery")
const jwt = require("jsonwebtoken");
require("dotenv").config();

let checkUserExits = (req, res, next) => {
  try {
    let token =  req.session.userId;
    let result = jwt.verify(token, process.env.SECRET);
    if(result) {
      next();
    }
  } catch (error) {
    return res.render("pages/alert/alert.ejs", {message: "Bạn cần phải đăng nhập"})
  }
}

let showUserPage = async (req, res, next) => {
  let token = req.session.userId;
  let userId = jwt.verify(token, process.env.SECRET);
  let userData = await userService.getUser(parseInt(userId.id));
  let itemData = await items.readAllItems();
  if(userData[0].roleId === 0 || userData[0].roleId === 3) {
    res.redirect("../../admin");
  } else {
    res.render('userPage/index', { itemDatas: itemData, user: userData});
  }
}
  
let showEmployeeHomePage = async (req, res, next) => {
  let token = req.session.userId;
  let userId = jwt.verify(token, process.env.SECRET);
  let userData = await userService.getUser(parseInt(userId.id));
  let itemData = await items.readAllItems();
  res.render('userPage/index', { itemDatas: itemData, user: userData});
}

let showSingleProduct = async (req, res, next) => { 
  let token = req.session.userId;
  let userId = jwt.verify(token, process.env.SECRET);
  let userData = await userService.getUser(parseInt(userId.id));
  let itemId = await itemService.getSingleItem(parseInt(req.query.id));
  res.render('userPage/product-detail/index', {singleItem: itemId, user: userData});
}

let logout = (req, res) => {
  req.session.destroy(function(err) {
    console.log("Session have been destroys");
  })
  // res.clearCookie("user")
  res.redirect("../../../")
}
module.exports = {
  checkUserExits,
  showUserPage,
  logout,
  showEmployeeHomePage,
  showSingleProduct
}