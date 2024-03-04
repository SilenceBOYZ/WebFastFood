const jwt = require("jsonwebtoken");
const items = require("../../services/indexPage/itemQuery");
const cartServices = require("../../services/cartServices");
const userServices = require("../../services/userServices");


require("dotenv").config()
let HomeRender = async (req, res) => {
    let token = req.session.userId;
    if (token) {
        res.redirect('user-page/private');
    } else {
        let itemData = await items.readAllItems(8);
        res.render('index', { itemDatas: itemData });
    }
}

let productDetail = async (req, res) => {
    let idItem = parseInt(req.query.id);
    let singleItem = await items.getSingleItem(idItem);
    res.render("pages/productDetail/productDetail", { singleItem });
}

let renderSearchPage = async (req, res) => {
    let user = req.session.userId;
    if (user) {
        let dataSucsessfull = jwt.verify(user, process.env.SECRET);
        let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
        let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
        return res.render("pages/shopSearch", { userData: userData, userCart, userCartSelected, totalCart });
    } else {
        let userData = null;
        let userCart = null;
        return res.render("pages/shopSearch", { userData, userCart});
    }
}
let renderCheckoutPage = async (req, res) => {
    let user = req.session.userId;
    if (user) {
        let dataSucsessfull = jwt.verify(user, process.env.SECRET);
        let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
        let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
        return res.render("pages/checkoutPage", { userData: userData, userCart, userCartSelected, totalCart });
    } else {
        let userData = null;
        let userCart = null;
        return res.render("pages/checkoutPage", { userData, userCart});
    }
}
let renderWishlistPage = async (req, res) => {
    let user = req.session.userId;
    if (user) {
        let dataSucsessfull = jwt.verify(user, process.env.SECRET);
        let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
        let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
        let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
        return res.render("pages/wishlistPage", { userData: userData, userCart, userCartSelected, totalCart });
    } else {
        let userData = null;
        let userCart = null;
        return res.render("pages/wishlistPage", { userData, userCart});
    }
}

module.exports = {
    HomeRender,
    productDetail,
    renderSearchPage,
    renderWishlistPage,
    renderCheckoutPage,
};