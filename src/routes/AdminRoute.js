const express = require("express")
const router = express.Router();
const  AdminController  = require('../app/controller/AdminController')

router.get("/", AdminController.AdminRender);
// router.get("/page/catergoryPage", AdminController.AdminPageCatergoryRender)
// router.get("/page/userPage", AdminController.AdminPageUserRender)

module.exports = router;

