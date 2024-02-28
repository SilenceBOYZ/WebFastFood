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
require('dotenv').config();

const RedisStore = require("connect-redis").default; // default localhost
const { createClient } = require("redis");

// Initialize client.
let redisClient = createClient()
redisClient.connect().then(
  console.log("Connect to redis success")
).catch(console.error)

let redisStore = new RedisStore({
  client: redisClient,  
})

app.use(session({
  secret: 'keyboard cat',
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 5 * 60 * 1000
  }
}))

// redisClient.hSet('cartId', {
//   id: 1,
//   userId: 2,
//   orderId: 1,
//   totalAmount: 30000,
// })

// const value = redisClient.hGetAll('cartId')
// .then((res) => res)
// .catch((err) => console.log(err))

// value.then(data => console.log(data))

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