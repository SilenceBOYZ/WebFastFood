const jwt = require("jsonwebtoken");
const Order = require("../../../services/orderServices")
const OrderItems = require("../../../services/orderItemService")
const cartServices = require("../../../services/cartServices");
const userServices = require("../../../services/userServices");
require("dotenv").config();

let paymentMethod = async (req, res) => {
  let user = req.session.userId;
  if (user ) {
    let data = await req.body;
    let dataSucsessfull = jwt.verify(user, process.env.SECRET);
    let orderId = await Order.createOrder(dataSucsessfull.id, data);
    if(orderId.errCode === 1) {
      res.redirect("../");
    } else {
      let userData = await userServices.getUser(parseInt(dataSucsessfull.id));
      let userCart = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let userCartSelected = await cartServices.getUserCart(parseInt(dataSucsessfull.id));
      let totalCart = await cartServices.getTotalItemInCart(parseInt(dataSucsessfull.id));
      let orderItems = await OrderItems.getOrderItem(parseInt(orderId), parseInt(dataSucsessfull.id));
      res.render("pages/bill", {userData, userCart, userCartSelected, totalCart, orderItems});
    }
  } else {
    res.redirect("../");
  }
}

module.exports = {
  paymentMethod,
}