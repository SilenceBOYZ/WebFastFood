const express = require("express")
const router = express.Router();
const HomeController = require("../app/controller/HomeController")

router.use("/", HomeController.HomeRender);

module.exports = router;

