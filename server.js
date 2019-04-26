"use strict";

require('dotenv').config();

const cookieSession = require('cookie-session');
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

app.use(cookieSession({
  name: 'session',
  keys: ["monkey", "star"]
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/dishes", (req, res) => {
  console.log('getting dishes route')
  knex.select("dishes.id","dishes.name","dishes.description","dishes.price", "dishes.type")
        .from("dishes")
        // req.params.type
        // .where("dishes.type","=","main")
        .then( (moreResults) => {
          res.json(moreResults)
        })
});

// order in progress
app.get("/neworder", (req, res) => {
  res.render("neworder")
});



// checkout order
app.get("/checkout", (req, res) => {
  res.render("checkout")
});

// summary page
app.get("/", (req, res) => {
  console.log('getting / route')
  res.render("index")
});

app.post('/buy_me', (req, res) => {
  res.send("checkout");
});

app.post("/delete", (req, res) => {
  res.redirect("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
