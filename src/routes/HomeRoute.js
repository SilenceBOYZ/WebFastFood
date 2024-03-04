const express = require("express")
const router = express.Router();
const HomeController = require("../app/controller/HomeController")

router.get("/", HomeController.HomeRender);
router.get("/product-detail", HomeController.productDetail);
router.get("/shop-search", HomeController.renderSearchPage);
router.get("/check-out", HomeController.renderCheckoutPage);
router.get("/wish-list", HomeController.renderWishlistPage);

module.exports = router;

