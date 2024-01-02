const express = require("express")
const HomeRoute = require("./HomeRoute");
const ShopRoute = require("./ShopRoute");
const AdminRoute = require("./AdminRoute");
const ItemRoute = require("./ItemsCrud");

let route = (app) => {
  app.use("/shop", ShopRoute);
  app.use("/handle-item", ItemRoute);
  app.use("/admin", AdminRoute);
  app.use("/", HomeRoute);
}

module.exports = route;