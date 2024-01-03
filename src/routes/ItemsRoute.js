const upload = require("../config/muterConfig")
const express = require("express")
const router = express.Router();
const itemsCrud = require("../app/controller/ItemsController");

router.post("/create-new-item", upload.single("productImage"), itemsCrud.createANewItem);
router.get("/get-item", itemsCrud.getAItem);
router.put("/edit-item", upload.single("productImage"), itemsCrud.editItem);
router.delete("/delete-item", itemsCrud.deleteItem);

module.exports = router;