const db = require("../../config");

class ShopController {
  async ShopRender(req, res) {
    db.getConnection(function (err, conn) {
      conn.execute("SELECT * FROM allcodes ", (err, rows, fields) => {
        res.render('pages/shop', {data: rows});
      });
      db.releaseConnection(conn);
    });
  }
}

module.exports = new ShopController;