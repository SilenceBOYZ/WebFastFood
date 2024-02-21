const express = require("express")
const router = express.Router();
const UserAuthController = require("../../app/controller/auth/UserAuthController");
const Authentication = require("../../app/controller/auth/Authentication");


router.post("/regist-user", UserAuthController.registUserAuth);
router.post("/login", UserAuthController.LoginAuth);
router.get("/private", Authentication.checkUserExits, Authentication.showUserPage);
router.get("/logout", Authentication.logout);
router.get("/home-employee", Authentication.checkUserExits, Authentication.showEmployeeHomePage);
router.get("/product-detail", Authentication.checkUserExits, Authentication.showSingleProduct);
router.post("/cart", (req, res) => {
  let cart = req.body.quality;
  res.send(cart);
});

module.exports = router;
