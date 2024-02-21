const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const route = require('./routes');
const db = require("./config");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require("express-session");

const Redis = require("ioredis");
const RedisStore = require("connect-redis").default;
const clientRedis = new Redis(); //defaul localhost

app.use(session({
  secret: 'keyboard cat',
  store: new RedisStore({client: clientRedis}),
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 5 * 60 * 1000
  }
}))

require('dotenv').config();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);

db.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})  