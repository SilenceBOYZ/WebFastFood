const { readAllItems } = require("../../services/itemServices");
const { readCatergoryNames } = require("../../services/itemServices");
const { readAllCatergories } = require("../../services/catergoriesServices");


let AdminRender = async (req, res) => {
  let dataSelected = await readAllItems();
  let catergoriesSelected = await readAllCatergories();
  let catergoriesNameSelected = await readCatergoryNames();
  let pageParams = req.query.page;
  return res.render('admin', { pageValue: pageParams, dataValue: dataSelected, dataCatergories: catergoriesSelected, catergoriesName: catergoriesNameSelected});
}

let AdminPageCatergoryRender = (req, res) => {
  return res.render('admin/page/catergoryPage.ejs');
}

let AdminPageUserRender = (req, res) => {
  return res.render('admin/page/userPage.ejs');
}

module.exports = {
  AdminRender: AdminRender,
  AdminPageCatergoryRender: AdminPageCatergoryRender,
  AdminPageUserRender: AdminPageUserRender
}; 