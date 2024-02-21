const { readAllItems } = require("../../services/itemServices");
const { readAllCatergories } = require("../../services/catergoriesServices");
const { readAllUsers, getUser } = require("../../services/userServices");
const { readAllRoles } = require("../../services/roleServices");
const { readAllCatergoriesForItems } = require("../../services/itemServices");
const jwt = require("jsonwebtoken");


let AdminRender = async (req, res) => {
  let pageParams = req.query.page;
  let numberPage = parseInt(req.query.pageNumber);
  let sessionID = req.session.userId;
  if (!numberPage) {
    numberPage = 0
  }
  if (sessionID) {
    let userId = jwt.verify(sessionID, process.env.SECRET);
    let userData = await getUser(parseInt(userId.id));
    if (userData[0].roleId === 0 || userData[0].roleId === 3) {
      let itemSelected = await readAllItems(numberPage);
      let catergoriesSelected = await readAllCatergories(numberPage);
      let allCatergories = await readAllCatergoriesForItems();
      let userSelected = await readAllUsers(numberPage);
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
    return res.redirect('../user-page/private');
  } else {
    return res.render("pages/alert/alert.ejs", { message: "Bạn cần phải đăng nhập" })
  }
}

module.exports = {
  AdminRender: AdminRender,
}; 