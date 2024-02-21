const express = require("express")
const router = express.Router();
const UserApiController = require("../../app/controller/api/UserApiController");

router.get("/", UserApiController.getAllUser);  
router.post("/compare-password", UserApiController.comparePassword);  

module.exports = router;
