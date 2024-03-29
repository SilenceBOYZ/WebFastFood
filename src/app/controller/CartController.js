const userServices = require("../../services/userServices");
const cartServices = require("../../services/cartServices");
const itemServices = require("../../services/indexPage/itemQuery")

const jwt = require("jsonwebtoken");


let cartRender = async (req, res) => {
  if (req.session.userId) {
    let token = await req.session.userId;
    let userId = await jwt.verify(token, process.env.SECRET);
    let userData = await userServices.getUser(parseInt(userId.id));
    let userCart = await cartServices.getUserCart(parseInt(userId.id));
    let userCartSelected = await cartServices.getUserCart(parseInt(userId.id));
    let totalCart = await cartServices.getTotalItemInCart(parseInt(userId.id));
    let itemsProduct = await itemServices.readAllItems(5);
    res.render("pages/cart/index.ejs", { userData: userData, userCart, userCartSelected, totalCart, itemsProduct });
  } else {
    let userData = null;
    let userCart = null;
    let itemsProduct = await itemServices.readAllItems(5);
    res.render("pages/cart/index.ejs", { userData, userCart, itemsProduct });
  }
}

let cartRenderPost = async (req, res) => {
  let userCart = req.session.cart;
  let itemSelected = req.body;
  // Get the id and the quantity of the Object
  // Using Object.keys and Object.values to get itemId and Quantity
  
  let singleItem = {
    itemId: Number.parseInt(Object.keys(itemSelected)[0]),
    quantity: Number.parseInt(Object.values(itemSelected)[0]),
  };
  if (userCart) {
    userCart.product.itemId = singleItem.itemId;
    userCart.product.quantity = singleItem.quantity;
  }
  let idUser = userCart.idUser;
  let productId = userCart.product.itemId;
  let quantity = userCart.product.quantity;
  await cartServices.addToCart(idUser, productId, quantity);
  res.redirect("../cart")
}


let udpateCartItems = async (req, res) => {
  // Change Object to array [ [key, value], ... ]
  if (req.session.userId) {
    let token = await req.session.userId;
    let user = jwt.verify(token, process.env.SECRET);
    let product = Object.entries(req.body);
    if (product.length < 1) return res.redirect("../cart");
    let cart = [];
    // Create a empty array cart 
    // Use forEach to loop array and push a object have id, quantity of the item into cart
    product.forEach((el) => (cart.push({
      itemId: Number.parseInt(el[0]),
      quantity: Number.parseInt(el[1]),
    })))
    await cartServices.updateItemsInCart(cart, Number.parseInt(user.id));
    res.redirect("../cart")
  }
  res.render("pages/alert/alert.ejs", { message: "Bạn cần phải đăng nhập" })
}

let deleteItemInCart = async (req, res) => {
  if (req.session.userId) {
    let userId =  Number.parseInt(req.query.userId);
    let itemId = Number.parseInt(req.query.id);
    await cartServices.deleteItemInCart(itemId, userId);
    res.redirect("../cart");
  }
  res.render("pages/alert/alert.ejs", { message: "Bạn cần phải đăng nhập" })
}

module.exports = {
  cartRender,
  cartRenderPost,
  udpateCartItems,
  deleteItemInCart
}