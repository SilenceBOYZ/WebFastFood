const { createNewItem } = require("../../services/itemServices");
const { editAItem } = require("../../services/itemServices");
const { updateItem } = require("../../services/itemServices");
const { removeItem } = require("../../services/itemServices");
const fs = require("fs");


let createANewItem = async (req, res) => {
  let data = await req.body;
  let imageName = await req.file.filename;
  await createNewItem(data, imageName);
  return res.redirect("../admin");
}

let getAItem = async (req, res) => {
  let itemId = req.query.id;
  let loadItem = await editAItem(parseInt(itemId));
  return res.render("admin/partials/userEdit.ejs", { item: loadItem });
}

let editItem = async (req, res) => {
  let itemId = req.query.id;
  let data = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync("public/img/uploads/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.old_image;
  }
  let item = await updateItem(parseInt(itemId), data, newImage);
  return res.redirect("../admin");
}

let deleteItem = async (req, res) => {
  let idItem = req.query.id;
  let message = await removeItem(parseInt(idItem));
  return res.redirect("../admin");
}
module.exports = {
  createANewItem: createANewItem,
  getAItem: getAItem,
  editItem: editItem,
  deleteItem: deleteItem,
}; 