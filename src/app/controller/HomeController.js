
class HomeController {
    HomeRender(req, res) {
        res.render('index');
    }
}

module.exports = new HomeController;