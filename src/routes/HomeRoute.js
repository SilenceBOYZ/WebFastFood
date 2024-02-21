const express = require("express")
const router = express.Router();
const HomeController = require("../app/controller/HomeController")

router.get("/", HomeController.HomeRender);
router.get("/product-detail", HomeController.productDetail);

module.exports = router;

