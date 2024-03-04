const jwt = require("jsonwebtoken");
const cartServices = require("../../services/cartServices");
const userServices = require("../../services/userServices");


class ShopController {
  async ShopRender(req, res) {
    let user = req.session.userId;
    if (user) {
      let dataSucsessfull = jwt.verify(user, process.env.SECRET);
      let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
      let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
      res.render('pages/shop', { userData: userData, userCart, userCartSelected, totalCart });
    } else {
      let userData = null;
      let userCart = null;
      res.render('pages/shop', { userData, userCart });
    }
  }
}

module.exports = new ShopController;