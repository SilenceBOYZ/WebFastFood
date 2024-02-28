const express = require("express")
const router = express.Router();
const UserAuthController = require("../../app/controller/auth/UserAuthController");
const Authentication = require("../../app/controller/auth/Authentication");
const { single } = require("../../config/muterConfig");


router.post("/regist-user", UserAuthController.registUserAuth);
router.post("/login", UserAuthController.LoginAuth);
router.get("/private", Authentication.checkUserExits, Authentication.showUserPage);
router.get("/logout", Authentication.logout);
router.get("/home-employee", Authentication.checkUserExits, Authentication.showEmployeeHomePage);
router.get("/product-detail", Authentication.checkUserExits, Authentication.showSingleProduct);
// router.post("/cart", (req, res) => {
//   let userCart = req.session.cart;
//   let itemSelected = req.body;
//   let singleItem = {
//     itemId: Number.parseInt(Object.keys(itemSelected)[0]),
//     quantity: Number.parseInt(Object.values(itemSelected)[0]),
//   };
//   if(userCart) {
//     let checkItem = userCart.products.find(x => x.itemId === singleItem.itemId);
//     if(checkItem) {
//       checkItem.quantity += singleItem.quantity;
//     } else {
//       userCart.products.push(singleItem);
//     } 
//   }
//   res.send(userCart)
// });

module.exports = router;
