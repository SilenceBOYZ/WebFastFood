const userServices = require("../../services/userServices");
const roleServices = require("../../services/roleServices")
const fs = require("fs");

let createANewUser = async (req, res) => {
  let data = req.body;
  let fileImage = req.file.filename;
  let userData = await userServices.createUser(data, fileImage);
  return res.redirect("../admin?page=userPage");
}

let getAUser = async (req, res) => {
  let userId = parseInt(req.query.id);
  let userSelected = await userServices.getUser(userId);
  let roleSelected = await roleServices.readAllRoles();
  res.render("admin/partials/userManage/editUserForm", { userData: userSelected, roleSelected });
}

let editUser = async (req, res) => {
  let data = req.body;
  let userId = parseInt(req.query.id);
  let newImage = "";
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync("public/img/uploads/userImages" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.old_image;
  }
  let user = await userServices.editUser(userId, data, newImage);
  return res.redirect("../admin?page=userPage");
}

let deleteUser = async (req, res) => {
  let idSelected = parseInt(req.query.id);
  await userServices.deleteUser(idSelected);
  return res.redirect("../admin?page=userPage");
}

module.exports = {
  createANewUser,
  getAUser,
  editUser,
  deleteUser,
}