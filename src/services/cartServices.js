const { QueryTypes } = require('sequelize');
const { seqeuelize } = require("../config");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let addToCart = (userId, itemId, quantity) => {
  let user = jwt.verify(userId, process.env.SECRET);
  return new Promise(async (resolve, reject) => {
    try {
      let checkItem = await getItemCart(Number.parseInt(itemId), Number.parseInt(user.id));
      if (!checkItem.errCode) {
        let cart = await db.Carts.create({
          userId: Number.parseInt(user.id),
          itemId: Number.parseInt(itemId),
          quantity: Number.parseInt(quantity),
        })
        resolve(cart);
      } else {
        let newQuantity = checkItem.cartInfor[0].quantity + Number.parseInt(quantity);
        let updateCart = seqeuelize.query("UPDATE carts SET quantity= " + newQuantity + " WHERE userId= " + Number.parseInt(user.id) + " AND " + " itemId= " + Number.parseInt(itemId), { type: QueryTypes.UPDATE })
        resolve(updateCart);
      }
    } catch (error) {
      reject(error);
    }
  })
}

// let checkItemExists = (id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let result;
//       let isItemExist = await db.Carts.findOne({where: {itemId: id}});
//       if(isItemExist) {
//         result = true;
//       } else {
//         result = false;
//       }
//       resolve(result);
//     } catch (error) {
//       reject(error);
//     }
//   })
// }

let getItemCart = (itemId, userId) => {
  let queryString = "SELECT DISTINCT items.foodName, items.foodPrice, items.foodImage, carts.quantity FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = " + userId + " AND carts.itemId = " + itemId;
  return new Promise(async (resolve, reject) => {
    try {
      let data = {}
      let cartItem = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      if (cartItem.length < 1) {
        data.errCode = false
      } else {
        data.errCode = true
        data.cartInfor = cartItem;
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}


let getUserCart = (id) => {
  let queryString = "SELECT DISTINCT items.foodName, items.foodPrice, items.foodImage, carts.quantity FROM `items`, `carts`, `users` WHERE items.id = carts.itemId AND carts.userId = users.id AND users.id = '" + id + "' ";
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await seqeuelize.query(queryString, { type: QueryTypes.SELECT })
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
  addToCart,
  getUserCart,
}