const express = require("express")
const app = express();
const path = require("path")
const port = 8080;
const route = require('./routes');
const db = require("./config")
require('dotenv').config();

app.use(express.static(path.join(__dirname, "../public")));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})