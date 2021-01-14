// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require("cookie-session")

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: "session",
  keys: ["user_id"]
}))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const itemRoutes = require("./routes/item");
const loginRoutes = require("./routes/login");
const postad = require("./routes/postad");
const search = require("./routes/search");
const conversations = require("./routes/conversations")
const messages = require("./routes/messages")
const favourites = require("./routes/favourites");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/item", itemRoutes(db));
app.use("/favourites", favourites(db));
app.use("/", loginRoutes(db));
app.use("/", postad(db));
app.use("/", search(db));
app.use("/", conversations(db));
app.use("/", messages(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
const sqlQuery = "SELECT * FROM items;";
const favsQuery = "SELECT * FROM favourites WHERE user_id = $1;"

app.get("/", (req, res) => {
  db.query(sqlQuery)
  .then(data => {
    const templateVars = { items: data.rows }
    db.query(favsQuery, [req.session.user_id])
    .then(data => {
      templateVars.favourites = data.rows;
      console.log("favourites", templateVars.favourites);
      res.render("index", templateVars);
    })
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
