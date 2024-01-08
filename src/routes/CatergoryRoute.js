const express = require("express")
const router = express.Router();
const CatergoryController = require("../app/controller/CatergoryController")

router.post("/create-new-catergory", CatergoryController.createANewCatergory);
router.get("/get-catergory", CatergoryController.getCatergory);
router.put("/edit-catergory", CatergoryController.editCatergory);
router.delete("/delete-catergory", CatergoryController.deleteCater);

module.exports = router;