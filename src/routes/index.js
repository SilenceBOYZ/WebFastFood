const express = require("express")
const HomeRoute = require("./HomeRoute")
const ShopRoute = require("./ShopRoute")

let route = (app) => {
  app.use("/shop", ShopRoute)
  app.use("/", HomeRoute)
}

module.exports = route;