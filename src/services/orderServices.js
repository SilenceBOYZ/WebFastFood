const { seqeuelize } = require("../config");
const db = require("../models/index");
const { QueryTypes } = require('sequelize');
const CartServices = require("../services/cartServices")


let createOrder = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userCart = await CartServices.getUserCart(userId);
      let itemsInCart = userCart.map(el => {
        return { totalPrice: el.foodPrice * el.quantity, foodId: el.foodId}
      })
      // console.log(itemsInCart);
      let itemStringId = await itemsInCart.map(el => el.foodId).join(", ");
      // Nếu độ dài của chuỗi bằng không nghĩa là item đã được tạo từ trước đó
      // Tránh trường hợp người dùng vô ích hay cố ý refresh lại trang web để thực hiện lại query lại một lần nữa
      // Lúc này ta sẽ trả mã lỗi về cho người dùng qua biến result và sẽ dùng errCode để chuyển trang
      // Việc này sẽ ngặn chặn việc tạo lại giỏ hàng một lần nữa
      if(itemStringId.length < 1) {
        let result = {}
        result.errCode = 1;
        result.message = "Id doesn't exist"
        resolve(result);
        return;
      }
      let totalAmount = itemsInCart.map(el => el.totalPrice).reduce((preEl, curEl) => preEl + curEl, 0)
      // console.log(totalAmount);
      let orders = await seqeuelize.query("INSERT INTO `Orders` (userId, address, phoneNumber, paymentMethod, totalAmount) VALUES (" + parseInt(userId) + ", '" + data.address + "', '" + data.phone + "', '" + data.payment + "', "+totalAmount+")", { type: QueryTypes.INSERT })
      // Biến orders sẽ trả về một mảng với [0] là id được tạo từ giỏ hàng và [1] cột
      if (orders) {
        let items = userCart.map(el => {
          return {foodId: el.foodId, foodPrice: el.foodPrice, quantity: el.quantity}
        })
        let stringTest=[];
        let idItems=[];
        for(let i = 0; i < items.length; i++) {
          stringTest.push(`(${orders[0]}, ${items[i].foodId}, ${items[i].quantity}, ${items[i].foodPrice})`);
          idItems.push(items[i].foodId);
        }
        let itemSelected = stringTest.join(', ');
        let itemsInCartToDelete = idItems.join(", ")
        // console.log(itemsInCartToDelete);
        await CartServices.deletItemsInCart(itemsInCartToDelete, userId);
        let queryString = "INSERT INTO `ordersItems` (orderId, itemId, quantity, unitPrice) VALUES " + itemSelected;
        await seqeuelize.query(queryString, { type: QueryTypes.INSERT })
      }
      resolve(orders[0]);
    } catch (error) {
      reject(error);
    }
  });
}

let getUserOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "SELECT orders.id, users.userName, orders.totalAmount, orders.address, orders.phoneNumber, orders.createdAt, orders.paymentMethod, orders.status FROM orders, users WHERE orders.userId = users.id AND users.id = " + userId;
      let orders = await seqeuelize.query(queryString, {type: QueryTypes.SELECT});
      resolve(orders);
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  createOrder,
  getUserOrder
}