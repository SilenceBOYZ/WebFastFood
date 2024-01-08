const { readAllItems } = require("../../services/itemServices");
const { readAllCatergories } = require("../../services/catergoriesServices");
const { readAllUsers } = require("../../services/userServices");
const { readAllRoles } = require("../../services/roleServices");
const { readAllCatergoriesForItems } = require("../../services/itemServices");


let AdminRender = async (req, res) => {
  let pageParams = req.query.page;
  let numberPage = parseInt(req.query.pageNumber);

  if (!numberPage) {
    numberPage = 0
  }
  let itemSelected = await readAllItems(numberPage);
  let catergoriesSelected = await readAllCatergories(numberPage);

  let allCatergories = await readAllCatergoriesForItems();

  let userSelected = await readAllUsers();
  let roleSelected = await readAllRoles();
  return res.render('admin',
    {
      pageValue: pageParams,
      dataValue: itemSelected,
      Catergories: allCatergories,
      dataCatergories: catergoriesSelected,
      userData: userSelected,
      roleSelected: roleSelected
    }
  );
}

module.exports = {
  AdminRender: AdminRender,
}; 