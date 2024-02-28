const userServices = require("../../services/userServices");
const cartServices = require("../../services/cartServices");

const jwt = require("jsonwebtoken");


let cartRender = async (req, res) => {
  if (req.session.userId) {
    let token = req.session.userId;
    let userId = jwt.verify(token, process.env.SECRET);
    let userData = await userServices.getUser(parseInt(userId.id));
    let userCart = await cartServices.getUserCart(parseInt(userId.id));
    res.render("pages/cart/index.ejs", { userData: userData, userCart });
  } else {
    let userData = null;
    let userCart = null;
    res.render("pages/cart/index.ejs", { userData, userCart });
  }
}

let cartRenderPost = async (req, res) => {
  let userCart = req.session.cart;
  let itemSelected = req.body;
  let singleItem = {
    itemId: Number.parseInt(Object.keys(itemSelected)[0]),
    quantity: Number.parseInt(Object.values(itemSelected)[0]),
  };
  if (userCart) {
    // let checkItem = userCart.products.find(x => x.itemId === singleItem.itemId);
    // if (checkItem) {
    //   checkItem.quantity += singleItem.quantity;
    // } else {
    //   userCart.products.push(singleItem);
    // }
    userCart.product.itemId = singleItem.itemId;
    userCart.product.quantity = singleItem.quantity;
  }
  let idUser = userCart.idUser;
  let productId = userCart.product.itemId;
  let quantity = userCart.product.quantity;
  await cartServices.addToCart(idUser, productId, quantity);
  res.redirect("../cart")
}
module.exports = {
  cartRender,
  cartRenderPost
}