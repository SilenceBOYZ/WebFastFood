
class HomeController {
    HomeRender(req, res) {
        res.render('pages/index');
    }
}

module.exports = new HomeController;