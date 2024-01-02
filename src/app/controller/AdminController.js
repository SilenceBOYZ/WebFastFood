const { readAllItems } = require("../../services/itemServices");

let AdminRender = async (req, res) => {
  let dataSelected = await readAllItems();
  return res.render('admin', { data: dataSelected });
}

module.exports = {
  AdminRender: AdminRender,
}; 