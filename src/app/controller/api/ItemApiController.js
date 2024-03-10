const itemService = require("../../../services/api/itemServices")

class Item {
  async getAllItem(req, res) {
    let pageNum = parseInt(req.query.pageNumber);
    let caterId =  isNaN(req.query.caterId) === true ? req.query.caterId : parseInt(req.query.caterId);;
    let caterName = req.query.caterName;
    let data = await itemService.readItems(pageNum, caterId, caterName);
    res.status(200).json(data);
  }
}

module.exports = new Item;