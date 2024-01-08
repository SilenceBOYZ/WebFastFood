const items = require("../../services/indexPage/itemQuery");

let HomeRender = async (req, res) => {
    let itemData = await items.readAllItems();
    res.render('index', { itemDatas: itemData });
}

module.exports = {
    HomeRender
};