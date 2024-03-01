const express = require("express")
const router = express.Router();
const uploadUserImage = require("../config/multerUserConfig")
const UserController  = require("../app/controller/UserController");

router.post("/create-new-user", uploadUserImage.single("userImage"), UserController.createANewUser);
router.get("/get-user", UserController.getAUser);
router.put("/edit-user", uploadUserImage.single("userImage"),UserController.editUser);
router.delete("/delete-user", UserController.deleteUser);

module.exports = router;  