const express = require("express")
const router = express.Router();
const ItemApiController = require("../../app/controller/api/ItemApiController")

router.get("/get-items", ItemApiController.getAllItem);

module.exports = router;