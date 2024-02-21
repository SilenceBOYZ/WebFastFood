const items = require("../../services/indexPage/itemQuery");

require("dotenv").config()
let HomeRender = async (req, res) => {
    let token = req.session.userId;
    if (token) {
        res.redirect('user-page/private');
    } else {
        let itemData = await items.readAllItems();
        res.render('index', { itemDatas: itemData });
    }
}

let productDetail = async (req, res) => {
    let idItem = parseInt(req.query.id);
    let singleItem = await items.getSingleItem(idItem);
    res.render("pages/productDetail/productDetail", { singleItem });
}

module.exports = {
    HomeRender,
    productDetail   
};