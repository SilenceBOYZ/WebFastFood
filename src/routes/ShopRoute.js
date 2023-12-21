const express = require("express")
const router = express.Router();
const ShopController = require("../app/controller/ShopController")

router.get("/", ShopController.ShopRender);

module.exports = router;

