const { createCatergory } = require("../../services/catergoriesServices")
const { getCatergoryData } = require("../../services/catergoriesServices");
const { updateCatergoryData } = require("../../services/catergoriesServices");
const { deleteCatergoryData } = require("../../services/catergoriesServices");

let createANewCatergory = async (req, res) => {
  let data = req.body;
  let check = await createCatergory(data);
  return res.redirect("../admin?page=catergoryPage");
}

let getCatergory = async (req, res) => {
  let idSelected = req.query.id;
  let catergorySelected = await getCatergoryData(parseInt(idSelected));
  return res.render("admin/partials/catergoryManage/editCartergoryForm", { catergorySelected });
}

let editCatergory = async (req, res) => {
  let idSelected = req.query.id;
  let data = req.body;
  await updateCatergoryData(parseInt(idSelected), data);
  return res.redirect("../admin?page=catergoryPage&pageNumber=1");
}

let deleteCater = async (req, res) => {
  let idSelected = req.query.id;
  await deleteCatergoryData(parseInt(idSelected));
  return res.redirect("../admin?page=catergoryPage&pageNumber=1");
}

module.exports = {
  createANewCatergory,
  getCatergory,
  editCatergory,
  deleteCater
}