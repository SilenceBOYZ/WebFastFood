const express = require("express")
const HomeRoute = require("./HomeRoute");
const ShopRoute = require("./ShopRoute");
const AdminRoute = require("./AdminRoute");
const ItemRoute = require("./ItemsRoute");
const CatergoryRoute = require("./CatergoryRoute");
const UserRoute = require("./UserRoute");
const UserAuth = require("./auth/AuthRoute");
const UserApi = require("./api/UserApiRoute");

let route = (app) => {
  app.use("/shop", ShopRoute);
  app.use("/handle-item", ItemRoute);
  app.use("/handle-catergory", CatergoryRoute);
  app.use("/handle-user", UserRoute);
  app.use("/api/get-all-user", UserApi);
  app.use("/user-authentical", UserAuth);
  app.use("/admin", AdminRoute);
  app.use("/user-page", UserAuth);
  app.use("/", HomeRoute);
}

module.exports = route; 