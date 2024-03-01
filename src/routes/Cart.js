const express = require("express")
const router = express.Router();
const CartController = require("../app/controller/CartController");

router.get("/", CartController.cartRender);
router.post("/add-to-cart", CartController.cartRenderPost);
router.post("/update-cart-items", CartController.udpateCartItems);

module.exports = router;