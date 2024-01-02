const express = require("express")
const router = express.Router();
const  AdminController  = require('../app/controller/AdminController')

router.get("/", AdminController.AdminRender);

module.exports = router;

