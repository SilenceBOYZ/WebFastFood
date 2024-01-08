const db = require("../../config");

class ShopController {
  async ShopRender(req, res) {
    res.render('pages/shop');
  }
}

module.exports = new ShopController;