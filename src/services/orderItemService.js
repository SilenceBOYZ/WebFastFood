const { seqeuelize } = require("../config");
const db = require("../models/index");
const { QueryTypes } = require('sequelize');


let getOrderItem = (orderId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "SELECT DISTINCT users.userName, items.foodName, items.foodImage, ordersitems.quantity, ordersitems.createdAt, ordersitems.unitPrice, orders.address, orders.phoneNumber, orders.paymentMethod, orders.totalAmount, orders.status FROM ordersitems, orders, items, users WHERE users.id = orders.userId AND ordersitems.itemId = items.id AND ordersitems.orderId = orders.id AND orders.id = "+ orderId +" AND users.id = " + userId;
      let orderItems = await seqeuelize.query(queryString, {type: QueryTypes.SELECT});
      resolve(orderItems);
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  getOrderItem,

}