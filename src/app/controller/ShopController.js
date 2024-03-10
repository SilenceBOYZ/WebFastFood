const jwt = require("jsonwebtoken");
const cartServices = require("../../services/cartServices");
const userServices = require("../../services/userServices");
const catergories = require("../../services/catergoriesServices");
const itemQuery = require("../../services/indexPage/itemQuery");


class ShopController {
  async ShopRender(req, res) {
    let pageNumber = Number.parseInt(req.query?.pageNumber);
    let caterName =  isNaN(req.query.caterName) === true ? req.query.caterName : parseInt(req.query.caterName);
    if (pageNumber === undefined) {
      pageNumber = 1;
    }
    if (caterName === undefined) {
      caterName = "ALL"
    }
    let user = req.session.userId;
    if (user) {
      let dataSucsessfull = jwt.verify(user, process.env.SECRET);
      let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
      let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
      let catergoryItems = await catergories.getAllCatergories();
      let data = await itemQuery.readItems(pageNumber, caterName);
      res.render('pages/shop', { userData: userData, userCart, userCartSelected, totalCart, data, catergoryItems });
    } else {
      let userData = null;
      let userCart = null;
      let data = await itemQuery.readItems(pageNumber, caterName);
      let catergoryItems = await catergories.getAllCatergories();
      res.render('pages/shop', { userData, userCart, data, catergoryItems });
    }
  }
}

module.exports = new ShopController;