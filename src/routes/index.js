const express = require("express")
const HomeRoute = require("./HomeRoute");
const ShopRoute = require("./ShopRoute");
const AdminRoute = require("./AdminRoute");
const ItemRoute = require("./ItemsRoute");
const CatergoryRoute = require("./CatergoryRoute");
const UserRoute = require("./UserRoute");

let route = (app) => {
  app.use("/shop", ShopRoute);
  app.use("/handle-item", ItemRoute);
  app.use("/handle-catergory", CatergoryRoute);
  app.use("/handle-user", UserRoute);
  app.use("/admin", AdminRoute);
  app.use("/", HomeRoute);
}

module.exports = route;