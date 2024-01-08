const { createNewItem } = require("../../services/itemServices");
const { editAItem } = require("../../services/itemServices");
const { updateItem } = require("../../services/itemServices");
const { removeItem } = require("../../services/itemServices");
const { readItemCatergoryNames } = require("../../services/itemServices");
const { readAllCatergoriesForItems } = require("../../services/itemServices")

const fs = require("fs");


let createANewItem = async (req, res) => {
  let data = await req.body;
  let imageName = await req.file.filename;
  await createNewItem(data, imageName);
  return res.redirect("../admin?page=itemPage");
}

let getAItem = async (req, res) => {
  let itemId = req.query.id;
  let loadItem = await editAItem(parseInt(itemId));
  let loadCater = await readAllCatergoriesForItems();
  let catergory = await readItemCatergoryNames(parseInt(itemId));
  return res.render("admin/partials/itemManage/itemEdit.ejs", { item: loadItem, catergory, loadCater });
}

let editItem = async (req, res) => {
  let itemId = req.query.id;
  let data = req.body;
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
  } else {
    newImage = req.body.old_image;
  }
  await updateItem(parseInt(itemId), data, newImage);
  return res.redirect("../admin?page=itemPage");
}

let deleteItem = async (req, res) => {
  let idItem = req.query.id;
  await removeItem(parseInt(idItem));
  return res.redirect("../admin?page=itemPage");
}
module.exports = {
  createANewItem: createANewItem,
  getAItem: getAItem,
  editItem: editItem,
  deleteItem: deleteItem,
}; 