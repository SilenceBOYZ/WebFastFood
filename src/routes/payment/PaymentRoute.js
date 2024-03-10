const express = require("express")
const router = express.Router();
const PaymentController = require("../../app/controller/payment/PaymentController")

router.post("/", PaymentController.paymentMethod)

module.exports = router;