const userApiService = require("../../../services/api/userServices");



let getUserEmail = async (req, res) => {
  let data = await userApiService.getAllUserEmail();
  res.status(200).json(data);
}
let getAllUser = async (req, res) => {
  let data = await userApiService.getAllUserData();
  res.status(200).json(data);
}

let comparePassword = async (req, res) => {
  let passwordRef = req.body.password;
  let email = req.body.email;
  let message = await userApiService.checkPasswordError(email, passwordRef);
  res.status(200).json(message)
}

module.exports = {
  getUserEmail,
  getAllUser,
  comparePassword,
}